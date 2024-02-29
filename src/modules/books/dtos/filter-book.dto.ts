import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/base/dtos/page-option.dto';

export class FilterBookDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  readonly title: string | null = null;

  @IsString()
  @IsOptional()
  readonly isbn: string | null = null;

  @IsString()
  @IsOptional()
  readonly authorName: string | null = null;

  @IsString()
  @IsOptional()
  readonly publisherName: string | null = null;

  @IsString({ each: true })
  @IsOptional()
  readonly categoriesIds: string[] | null = [];
}
