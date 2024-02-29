import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCategoryDto } from '../dtos/create-category.dto';
import { CategoriesEntity } from '../entities/categories.entity';
import { GenericResponseDto } from 'src/base/models/generic-response.model';
import { PageDto } from 'src/base/dtos/page.dto';
import { PageMetaDto } from 'src/base/dtos/page-meta.dto';
import { ListCategoryDto } from '../dtos/list-category.dto';
import { FilterCategoryDto } from '../dtos/filter-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRespository: Repository<CategoriesEntity>,
  ) {}

  async findAll(
    filter: FilterCategoryDto,
  ): Promise<GenericResponseDto<PageDto<ListCategoryDto>>> {
    const queryBuilder =
      this.categoriesRespository.createQueryBuilder('categories');

    queryBuilder
      .where('name LIKE :name', {
        name: `%${filter.name}%`,
      })
      .andWhere('(:description IS NULL OR description LIKE :description)', {
        description: `%${filter.description}%`,
      })
      .orderBy('created_at', filter.order)
      .skip(filter.skip)
      .take(filter.limit);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: filter });

    return new GenericResponseDto(
      HttpStatus.OK,
      'Success',
      new PageDto(entities, pageMetaDto),
    );
  }

  async create(
    category: CreateCategoryDto,
  ): Promise<GenericResponseDto<CategoriesEntity>> {
    const response = await this.categoriesRespository.save(category);

    return new GenericResponseDto(HttpStatus.OK, 'Success', response);
  }

  async getCategoryByIds(ids: string[]): Promise<CategoriesEntity[]> {
    const data = await this.categoriesRespository.findBy({
      secure_id: In(ids),
    });

    return data;
  }

  async findOne(id: string): Promise<GenericResponseDto<CategoriesEntity>> {
    const data = await this.categoriesRespository.findOne({
      where: {
        secure_id: id,
      },
    });

    return new GenericResponseDto(HttpStatus.OK, 'Success', data);
  }

  async findOrFail(id: string): Promise<CategoriesEntity> {
    return await this.categoriesRespository
      .findOneOrFail({
        where: {
          secure_id: id,
        },
      })
      .catch(() => {
        throw new NotFoundException('Category Not Found');
      });
  }

  async update(
    id: string,
    category: CreateCategoryDto,
  ): Promise<GenericResponseDto<CategoriesEntity>> {
    await this.findOrFail(id);

    await this.categoriesRespository.update(
      {
        secure_id: id,
      },
      category,
    );

    return new GenericResponseDto(
      HttpStatus.OK,
      'Success',
      await this.categoriesRespository.findOne({
        where: {
          secure_id: id,
        },
      }),
    );
  }

  async delete(id: string): Promise<GenericResponseDto<UpdateResult>> {
    await this.findOrFail(id);
    await this.categoriesRespository.softDelete({
      secure_id: id,
    });

    return new GenericResponseDto(HttpStatus.OK, 'Success');
  }
}
