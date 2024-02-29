import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Injectable,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';

import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoriesService } from './services/categories.service';
import { PageDto } from 'src/base/dtos/page.dto';
import { ListCategoryDto } from './dtos/list-category.dto';
import { CategoriesEntity } from './entities/categories.entity';
import { GenericResponseDto } from 'src/base/models/generic-response.model';
import { UpdateResult } from 'typeorm';
import { FilterCategoryDto } from './dtos/filter-category.dto';

@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() filter: FilterCategoryDto,
  ): Promise<GenericResponseDto<PageDto<ListCategoryDto>>> {
    return this.categoriesService.findAll(filter);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<GenericResponseDto<CategoriesEntity>> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get(':id')
  find(@Param('id') id: string): Promise<GenericResponseDto<CategoriesEntity>> {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ): Promise<GenericResponseDto<CategoriesEntity>> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  softDelete(
    @Param('id') id: string,
  ): Promise<GenericResponseDto<UpdateResult>> {
    return this.categoriesService.delete(id);
  }
}
