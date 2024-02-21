import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { BooksEntity } from 'src/modules/books/entities/books.entity';
import { CreateBookDto } from '../dtos/create-book.dto';
import { PageOptionsDto } from 'src/base/dtos/page-option.dto';
import { PageDto } from 'src/base/dtos/page.dto';
import { CategoriesService } from 'src/modules/categories/services/categories.service';
import { GenericResponseDto } from 'src/base/models/generic-response.model';
import { PageMetaDto } from 'src/base/dtos/page-meta.dto';
import { ListBookModel } from '../models/list-book.model';
import { AuthorsService } from 'src/modules/authors/services/authors.service';
import { PublishersService } from 'src/modules/publishers/services/publishers.service';

@Injectable()
export class BooksService {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly publishersService: PublishersService,
    private readonly categoriesService: CategoriesService,

    @InjectRepository(BooksEntity)
    private readonly booksRepository: Repository<BooksEntity>,
  ) {}

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<GenericResponseDto<PageDto<ListBookModel>>> {
    const queryBuilder = this.booksRepository.createQueryBuilder('books');

    queryBuilder
      .innerJoinAndSelect('books.categories', 'categories')
      .innerJoinAndSelect('books.authors', 'authors')
      .innerJoinAndSelect('books.publishers', 'publisher')
      .orderBy('books.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.limit);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const transformedEntities = entities.map(
      (entity) => new ListBookModel(entity),
    );

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new GenericResponseDto(
      HttpStatus.OK,
      'Success',
      new PageDto(transformedEntities, pageMetaDto),
    );
  }

  async findOne(id: string): Promise<GenericResponseDto<BooksEntity>> {
    const data = await this.booksRepository.findOne({
      relations: {
        categories: true,
      },
      where: {
        secure_id: id,
      },
    });

    return new GenericResponseDto(HttpStatus.OK, 'Success', data);
  }

  async findOrFail(id: string): Promise<BooksEntity> {
    return await this.booksRepository
      .findOneOrFail({
        where: {
          secure_id: id,
        },
      })
      .catch(() => {
        throw new NotFoundException('Book Not Found');
      });
  }

  async create(book: CreateBookDto): Promise<GenericResponseDto<BooksEntity>> {
    const author = await this.authorsService.findOrFail(book.author_id);
    const publisher = await this.publishersService.findOrFail(
      book.publisher_id,
    );
    const categories = await this.categoriesService.getCategoryByIds(
      book.category_ids,
    );

    const data = await this.booksRepository.save({
      ...book,
      categories,
      author,
      publisher,
    });

    return new GenericResponseDto(HttpStatus.OK, 'Success', data);
  }

  async update(
    id: string,
    book: CreateBookDto,
  ): Promise<GenericResponseDto<BooksEntity>> {
    const bookEntity = await this.findOrFail(id);
    const categoriesEntity = await this.categoriesService.getCategoryByIds(
      book.category_ids,
    );
    const authorEntity = await this.authorsService.findOrFail(book.author_id);
    const publisherEntity = await this.publishersService.findOrFail(
      book.publisher_id,
    );

    const data = (await this.findOne(id)).data;

    bookEntity.title = book.title;
    bookEntity.description = book.description;
    bookEntity.isbn = book.isbn;
    bookEntity.pageCount = book.pageCount;
    bookEntity.price = book.price;

    bookEntity.categories = categoriesEntity;
    bookEntity.author = authorEntity;
    bookEntity.publisher = publisherEntity;

    await this.booksRepository.save(bookEntity);

    return new GenericResponseDto(HttpStatus.OK, 'Success', data);
  }

  async delete(id: string): Promise<GenericResponseDto<UpdateResult>> {
    await this.findOrFail(id);
    await this.booksRepository.softDelete({
      secure_id: id,
    });

    return new GenericResponseDto(HttpStatus.OK, 'Success');
  }
}
