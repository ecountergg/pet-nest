import { Module } from '@nestjs/common';

import { BooksService } from './services/books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksEntity } from './entities/books.entity';
import { CategoriesEntity } from '../categories/entities/categories.entity';
import { BooksController } from './books.controller';
import { IsUniqueConstraint } from 'src/base/validators/is-unique-constraint.validator';
import { AuthorsEntity } from '../authors/entities/authors.entity';
import { PublishersEntity } from '../publishers/entities/publishers.entity';
import { AuthorsModule } from '../authors/authors.module';
import { CategoriesModule } from '../categories/categories.module';
import { PublishersModule } from '../publishers/publishers.module';

@Module({
  imports: [
    AuthorsModule,
    CategoriesModule,
    PublishersModule,
    TypeOrmModule.forFeature([
      BooksEntity,
      CategoriesEntity,
      AuthorsEntity,
      PublishersEntity,
    ]),
  ],
  providers: [BooksService, IsUniqueConstraint],
  controllers: [BooksController],
})
export class BooksModule {}
