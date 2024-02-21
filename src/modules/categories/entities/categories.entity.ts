import { Entity, Column } from 'typeorm';

import { TABLE_NAME } from 'src/base/consts/table-name.const';
import { AbstractEntity } from 'src/base/helpers/abstract-entity.helper';

@Entity(TABLE_NAME.CATEGORIES)
export class CategoriesEntity extends AbstractEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string;
}
