import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { RequestStatus } from '@prisma/client';
import { CreateRequestDto } from './create-request.dto';

export class UpdateRequestDto extends PartialType(CreateRequestDto) {
  @IsOptional()
  @IsEnum(RequestStatus)
  status?: RequestStatus;
}
