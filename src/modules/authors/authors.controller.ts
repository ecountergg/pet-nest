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

import { CreateAuthorDto } from './dtos/create-author.dto';
import { AuthorsService } from './services/authors.service';
import { PageDto } from 'src/base/dtos/page.dto';
import { AuthorsEntity } from './entities/authors.entity';
import { GenericResponseDto } from 'src/base/models/generic-response.model';
import { UpdateResult } from 'typeorm';
import { FilterAuthorDto } from './dtos/filter-author.dto';
import { ListAuthorDto } from './dtos/list-author.dto';

@Controller('authors')
@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(
    @Query() pageOptionsDto: FilterAuthorDto,
  ): Promise<GenericResponseDto<PageDto<ListAuthorDto>>> {
    return this.authorsService.findAll(pageOptionsDto);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createCategoryDto: CreateAuthorDto,
  ): Promise<GenericResponseDto<AuthorsEntity>> {
    return this.authorsService.create(createCategoryDto);
  }

  @Get(':id')
  find(@Param('id') id: string): Promise<GenericResponseDto<AuthorsEntity>> {
    return this.authorsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateAuthorDto,
  ): Promise<GenericResponseDto<AuthorsEntity>> {
    return this.authorsService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  softDelete(
    @Param('id') id: string,
  ): Promise<GenericResponseDto<UpdateResult>> {
    return this.authorsService.delete(id);
  }
}
