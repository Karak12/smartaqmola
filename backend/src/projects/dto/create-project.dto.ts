import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LocalizedDto } from '../../common/dto/localized.dto';

export class CreateProjectDto {
  @ValidateNested()
  @Type(() => LocalizedDto)
  name: LocalizedDto;

  @ValidateNested()
  @Type(() => LocalizedDto)
  tagline: LocalizedDto;

  @ValidateNested()
  @Type(() => LocalizedDto)
  description: LocalizedDto;

  @IsString()
  icon: string;

  @IsOptional()
  @IsString()
  color?: string;

  @ValidateNested()
  @Type(() => LocalizedDto)
  status: LocalizedDto;

  @IsString()
  year: string;

  @ValidateNested()
  @Type(() => LocalizedDto)
  area: LocalizedDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocalizedDto)
  tags: LocalizedDto[];

  @IsOptional()
  @IsString()
  coverKey?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
