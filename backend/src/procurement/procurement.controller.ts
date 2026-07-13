import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProcurementService } from './procurement.service';
import { CreateProcurementDto } from './dto/create-procurement.dto';
import { UpdateProcurementDto } from './dto/update-procurement.dto';

@Controller('procurement')
export class ProcurementController {
  constructor(private readonly procurement: ProcurementService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateProcurementDto) {
    return this.procurement.create(dto);
  }

  @Get()
  findAll(@Query('groupKey') groupKey?: string) {
    return this.procurement.findAll(groupKey);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procurement.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateProcurementDto) {
    return this.procurement.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.procurement.remove(id);
  }
}
