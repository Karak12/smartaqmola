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
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly news: NewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateNewsDto) {
    return this.news.create(dto);
  }

  @Get()
  findAll() {
    return this.news.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.news.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateNewsDto) {
    return this.news.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.news.remove(id);
  }
}
