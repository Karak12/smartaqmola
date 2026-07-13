import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateRequestDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsString()
  @MinLength(5)
  message: string;

  @IsOptional()
  @IsString()
  address?: string;
}
