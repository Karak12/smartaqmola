import { IsString } from 'class-validator';

// Двуязычная строка LS = { ru, kk }.
export class LocalizedDto {
  @IsString()
  ru: string;

  @IsString()
  kk: string;
}
