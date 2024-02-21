import { Module } from '@nestjs/common';

import { BooksService } from './services/books.service';
import { CategoriesService } from '../categories/services/categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksEntity } from './entities/books.entity';
import { CategoriesEntity } from '../categories/entities/categories.entity';
import { BooksController } from './books.controller';
import { IsUniqueConstraint } from 'src/base/validators/is-unique-constraint.validator';
import { AuthorsService } from '../authors/services/authors.service';
import { PublishersService } from '../publishers/services/publishers.service';
import { AuthorsEntity } from '../authors/entities/authors.entity';
import { PublishersEntity } from '../publishers/entities/publishers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BooksEntity,
      CategoriesEntity,
      AuthorsEntity,
      PublishersEntity,
    ]),
  ],
  providers: [
    BooksService,
    CategoriesService,
    AuthorsService,
    PublishersService,
    IsUniqueConstraint,
  ],
  controllers: [BooksController],
})
export class BooksModule {}
