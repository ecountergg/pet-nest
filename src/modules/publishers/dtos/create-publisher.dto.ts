import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePublisherDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsString()
  readonly address: string;

  @IsNumber()
  readonly foundingYear: number;
}
