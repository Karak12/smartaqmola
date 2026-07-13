import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LocalizedDto } from '../../common/dto/localized.dto';

export class CreateProcurementDto {
  @IsString()
  groupKey: string; // "plan" | "auction"

  @ValidateNested()
  @Type(() => LocalizedDto)
  label: LocalizedDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  meta?: LocalizedDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedDto)
  badge?: LocalizedDto;

  @IsOptional()
  @IsString()
  fileKey?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
