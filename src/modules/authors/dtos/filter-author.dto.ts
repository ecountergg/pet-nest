import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/base/dtos/page-option.dto';

export class FilterAuthorDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  readonly name: string = '';

  @IsString()
  @IsOptional()
  readonly birthYear: string = null;
}
