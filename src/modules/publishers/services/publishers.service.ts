import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePublisherDto } from '../dtos/create-publisher.dto';
import { PublishersEntity } from '../entities/publishers.entity';
import { GenericResponseDto } from 'src/base/models/generic-response.model';
import { PageDto } from 'src/base/dtos/page.dto';
import { PageMetaDto } from 'src/base/dtos/page-meta.dto';
import { FilterPublisherDto } from '../dtos/filter-publisher.dto';
import { ListPublisherDto } from '../dtos/list-publisher.dto';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(PublishersEntity)
    private readonly publishersRespository: Repository<PublishersEntity>,
  ) {}

  async findAll(
    filter: FilterPublisherDto,
  ): Promise<GenericResponseDto<PageDto<ListPublisherDto>>> {
    const queryBuilder =
      this.publishersRespository.createQueryBuilder('publishers');

    queryBuilder
      .where('name LIKE :name', {
        name: `%${filter.name}%`,
      })
      .andWhere('(:foundingYear IS NULL OR founding_year = :foundingYear)', {
        foundingYear: filter.foundingYear,
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
    publisher: CreatePublisherDto,
  ): Promise<GenericResponseDto<PublishersEntity>> {
    const response = await this.publishersRespository.save(publisher);

    return new GenericResponseDto(HttpStatus.OK, 'Success', response);
  }

  async getCategoryByIds(
    ids: string[],
  ): Promise<GenericResponseDto<PublishersEntity[]>> {
    const data = await this.publishersRespository.findBy({
      secure_id: In(ids),
    });

    return new GenericResponseDto(HttpStatus.OK, 'Success', data);
  }

  async findOne(id: string): Promise<GenericResponseDto<PublishersEntity>> {
    const data = await this.publishersRespository.findOne({
      where: {
        secure_id: id,
      },
    });

    return new GenericResponseDto(HttpStatus.OK, 'Success', data);
  }

  async findOrFail(id: string): Promise<PublishersEntity> {
    return await this.publishersRespository
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
    publisher: CreatePublisherDto,
  ): Promise<GenericResponseDto<PublishersEntity>> {
    await this.findOrFail(id);

    await this.publishersRespository.update(
      {
        secure_id: id,
      },
      publisher,
    );

    return new GenericResponseDto(
      HttpStatus.OK,
      'Success',
      await this.publishersRespository.findOne({
        where: {
          secure_id: id,
        },
      }),
    );
  }

  async delete(id: string): Promise<GenericResponseDto<UpdateResult>> {
    await this.findOrFail(id);
    await this.publishersRespository.softDelete({
      secure_id: id,
    });

    return new GenericResponseDto(HttpStatus.OK, 'Success');
  }
}
