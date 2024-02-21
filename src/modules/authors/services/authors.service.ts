import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateAuthorDto } from '../dtos/create-author.dto';
import { AuthorsEntity } from '../entities/authors.entity';
import { GenericResponseDto } from 'src/base/models/generic-response.model';
import { PageDto } from 'src/base/dtos/page.dto';
import { PageMetaDto } from 'src/base/dtos/page-meta.dto';
import { FilterAuthorDto } from '../dtos/filter-author.dto';
import { ListAuthorDto } from '../dtos/list-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorsEntity)
    private readonly authorsRepository: Repository<AuthorsEntity>,
  ) {}

  async findAll(
    filter: FilterAuthorDto,
  ): Promise<GenericResponseDto<PageDto<ListAuthorDto>>> {
    const queryBuilder = this.authorsRepository.createQueryBuilder('authors');

    queryBuilder
      .where('name LIKE :name', {
        name: `%${filter.name}%`,
      })
      .andWhere('(:birthYear IS NULL OR birth_year = :birthYear)', {
        birthYear: filter.birthYear,
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
    author: CreateAuthorDto,
  ): Promise<GenericResponseDto<AuthorsEntity>> {
    const response = await this.authorsRepository.save(author);

    return new GenericResponseDto(HttpStatus.OK, 'Success', response);
  }

  async getCategoryByIds(
    ids: string[],
  ): Promise<GenericResponseDto<AuthorsEntity[]>> {
    const data = await this.authorsRepository.findBy({
      secure_id: In(ids),
    });

    return new GenericResponseDto(HttpStatus.OK, 'Success', data);
  }

  async findOne(id: string): Promise<GenericResponseDto<AuthorsEntity>> {
    const data = await this.authorsRepository.findOne({
      where: {
        secure_id: id,
      },
    });

    return new GenericResponseDto(HttpStatus.OK, 'Success', data);
  }

  async findOrFail(id: string): Promise<AuthorsEntity> {
    return await this.authorsRepository
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
    author: CreateAuthorDto,
  ): Promise<GenericResponseDto<AuthorsEntity>> {
    await this.findOrFail(id);

    await this.authorsRepository.update(
      {
        secure_id: id,
      },
      author,
    );

    return new GenericResponseDto(
      HttpStatus.OK,
      'Success',
      await this.authorsRepository.findOne({
        where: {
          secure_id: id,
        },
      }),
    );
  }

  async delete(id: string): Promise<GenericResponseDto<UpdateResult>> {
    await this.findOrFail(id);
    await this.authorsRepository.softDelete({
      secure_id: id,
    });

    return new GenericResponseDto(HttpStatus.OK, 'Success');
  }
}
