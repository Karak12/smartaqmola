import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LocalizedDto } from '../../common/dto/localized.dto';

export class CreateKpiDto {
  @IsString()
  icon: string;

  @IsOptional()
  @IsString()
  color?: string;

  @ValidateNested()
  @Type(() => LocalizedDto)
  label: LocalizedDto;

  @ValidateNested()
  @Type(() => LocalizedDto)
  value: LocalizedDto;

  @ValidateNested()
  @Type(() => LocalizedDto)
  sub: LocalizedDto;

  @IsOptional()
  @IsString()
  delta?: string;

  @IsOptional()
  @IsIn(['up', 'down'])
  deltaTone?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
