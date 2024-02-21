import {
  Controller,
  Post,
  Query,
  Put,
  Get,
  Delete,
  Body,
  Injectable,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import {
  CreateBookDto,
  CreateBookDto as UpdateBookDto,
} from './dtos/create-book.dto';
import { PageOptionsDto } from 'src/base/dtos/page-option.dto';
import { PageDto } from 'src/base/dtos/page.dto';
import { UpdateResult } from 'typeorm';
import { BooksService } from './services/books.service';
import { BooksEntity } from './entities/books.entity';
import { GenericResponseDto } from 'src/base/models/generic-response.model';
import { ListBookModel } from './models/list-book.model';

@Injectable()
@Controller('books')
@UseInterceptors(ClassSerializerInterceptor)
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  create(
    @Body() createBookDto: CreateBookDto,
  ): Promise<GenericResponseDto<BooksEntity>> {
    return this.bookService.create(createBookDto);
  }

  @Get()
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<GenericResponseDto<PageDto<ListBookModel>>> {
    return this.bookService.findAll(pageOptionsDto);
  }

  @Get(':id')
  find(@Param('id') id: string): Promise<GenericResponseDto<BooksEntity>> {
    return this.bookService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<GenericResponseDto<BooksEntity>> {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  softDelete(
    @Param('id') id: string,
  ): Promise<GenericResponseDto<UpdateResult>> {
    return this.bookService.delete(id);
  }
}
