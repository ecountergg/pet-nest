import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/base/dtos/page-option.dto';

export class FilterCategoryDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  readonly name: string = '';

  @IsString()
  @IsOptional()
  readonly description: string = '';
}
