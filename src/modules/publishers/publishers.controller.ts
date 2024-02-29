import {
  Controller,
  Post,
  Query,
  Put,
  Get,
  Delete,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import {
  CreatePublisherDto,
  CreatePublisherDto as UpdatePublisherDto,
} from './dtos/create-publisher.dto';
import { PublishersService } from './services/publishers.service';
import { PageDto } from 'src/base/dtos/page.dto';
import { PublishersEntity } from './entities/publishers.entity';
import { UpdateResult } from 'typeorm';
import { GenericResponseDto } from 'src/base/models/generic-response.model';
import { FilterPublisherDto } from './dtos/filter-publisher.dto';
import { ListPublisherDto } from './dtos/list-publisher.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('publishers')
export class PublisherController {
  constructor(private readonly publishersService: PublishersService) {}

  @Post()
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publishersService.create(createPublisherDto);
  }

  @Get()
  async findAll(
    @Query() pageOptionsDto: FilterPublisherDto,
  ): Promise<GenericResponseDto<PageDto<ListPublisherDto>>> {
    return this.publishersService.findAll(pageOptionsDto);
  }

  @Get(':id')
  find(@Param('id') id: string): Promise<GenericResponseDto<PublishersEntity>> {
    return this.publishersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublisherDto: UpdatePublisherDto,
  ): Promise<GenericResponseDto<PublishersEntity>> {
    return this.publishersService.update(id, updatePublisherDto);
  }

  @Delete(':id')
  softDelete(
    @Param('id') id: string,
  ): Promise<GenericResponseDto<UpdateResult>> {
    return this.publishersService.delete(id);
  }
}
