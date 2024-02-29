import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/base/dtos/page-option.dto';

export class FilterBookDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  readonly title: string = '';

  @IsString()
  @IsOptional()
  readonly isbn: string = '';

  @IsString()
  @IsOptional()
  readonly authorName: string = '';

  @IsString()
  @IsOptional()
  readonly publisherName: string = '';

  @IsString({ each: true })
  @IsOptional()
  readonly categoriesIds: string[] | null = [];
}
