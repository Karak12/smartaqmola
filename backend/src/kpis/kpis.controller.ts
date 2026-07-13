import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { KpisService } from './kpis.service';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';

@Controller('kpis')
export class KpisController {
  constructor(private readonly kpis: KpisService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateKpiDto) {
    return this.kpis.create(dto);
  }

  @Get()
  findAll() {
    return this.kpis.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kpis.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateKpiDto) {
    return this.kpis.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.kpis.remove(id);
  }
}
