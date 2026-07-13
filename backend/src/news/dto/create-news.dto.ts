import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LocalizedDto } from '../../common/dto/localized.dto';

export class CreateNewsDto {
  @ValidateNested()
  @Type(() => LocalizedDto)
  date: LocalizedDto;

  @ValidateNested()
  @Type(() => LocalizedDto)
  title: LocalizedDto;

  @IsOptional()
  @IsString()
  tone?: string;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
