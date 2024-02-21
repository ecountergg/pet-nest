import { Entity, Column, OneToMany } from 'typeorm';

import { TABLE_NAME } from 'src/base/consts/table-name.const';
import { AbstractEntity } from 'src/base/helpers/abstract-entity.helper';
import { BooksEntity } from 'src/modules/books/entities/books.entity';
import { Expose, Transform } from 'class-transformer';

@Entity(TABLE_NAME.PUBLISHERS)
export class PublishersEntity extends AbstractEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'address', type: 'text', nullable: true })
  address: string;

  @Expose({ name: 'founding_year' })
  @Transform(({ value }) => parseInt(value))
  @Column({ name: 'founding_year', type: 'char', length: 4, nullable: true })
  foundingYear: number;

  @OneToMany(() => BooksEntity, (book) => book.publisher)
  book: BooksEntity;
}
