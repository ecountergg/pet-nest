import { IsString, IsNotEmpty, ArrayMinSize, IsNumber } from 'class-validator';
import { TABLE_NAME } from 'src/base/consts/table-name.const';
import { isUnique } from 'src/base/validators/is-unique.validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @isUnique({ tableName: TABLE_NAME.BOOKS, column: 'isbn' })
  readonly isbn: string;

  @IsNotEmpty()
  @IsNumber()
  readonly pageCount: number;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  readonly author_id: string;

  @IsNotEmpty()
  @IsString()
  readonly publisher_id: string;

  @IsNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  readonly category_ids: string[];
}
