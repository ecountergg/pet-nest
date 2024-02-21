import { Entity, Column, OneToMany } from 'typeorm';

import { TABLE_NAME } from 'src/base/consts/table-name.const';
import { AbstractEntity } from 'src/base/helpers/abstract-entity.helper';
import { BooksEntity } from 'src/modules/books/entities/books.entity';
import { Expose, Transform } from 'class-transformer';

@Entity(TABLE_NAME.AUTHORS)
export class AuthorsEntity extends AbstractEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Expose({ name: 'birth_year' })
  @Transform(({ value }) => parseInt(value))
  @Column({ name: 'birth_year', type: 'char', length: 4, nullable: true })
  birthYear: number;

  @Column({ name: 'bio', type: 'text', nullable: true })
  bio: string;

  @OneToMany(() => BooksEntity, (book) => book.author)
  book: BooksEntity;
}
