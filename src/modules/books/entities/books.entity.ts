import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { TABLE_NAME } from 'src/base/consts/table-name.const';
import { AbstractEntity } from 'src/base/helpers/abstract-entity.helper';
import { CategoriesEntity } from 'src/modules/categories/entities/categories.entity';
import { PublishersEntity } from 'src/modules/publishers/entities/publishers.entity';
import { AuthorsEntity } from 'src/modules/authors/entities/authors.entity';

@Entity(TABLE_NAME.BOOKS)
export class BooksEntity extends AbstractEntity {
  @Column({ name: 'title', type: 'varchar', length: 100 })
  title: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'isbn', type: 'char', length: 13, unique: true })
  isbn: string;

  @Column({
    name: 'page_count',
    type: 'smallint',
  })
  pageCount: number;

  @Column({ name: 'price', type: 'decimal', precision: 10 })
  price: number;

  @ManyToOne(() => PublishersEntity, (publisher) => publisher.book)
  @JoinColumn({
    name: 'publisher_id',
    referencedColumnName: 'id',
  })
  publisher: PublishersEntity;

  @ManyToOne(() => AuthorsEntity, (author) => author.book)
  @JoinColumn({
    name: 'author_id',
    referencedColumnName: 'id',
  })
  author: AuthorsEntity;

  @ManyToMany(() => CategoriesEntity, (book) => book, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'book_categories',
    joinColumn: {
      name: 'book_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: CategoriesEntity[];
}
