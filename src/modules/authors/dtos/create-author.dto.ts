import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly birthYear: number;

  @IsString()
  readonly bio: string;
}
