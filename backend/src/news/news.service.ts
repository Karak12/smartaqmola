import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateNewsDto) {
    return this.prisma.news.create({
      data: {
        date: { ...dto.date },
        title: { ...dto.title },
        tone: dto.tone ?? '#2563EB',
        order: dto.order ?? 0,
        published: dto.published ?? true,
      },
    });
  }

  findAll() {
    return this.prisma.news.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.news.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Новость не найдена');
    return item;
  }

  async update(id: string, dto: UpdateNewsDto) {
    await this.findOne(id);
    return this.prisma.news.update({
      where: { id },
      data: {
        date: dto.date ? { ...dto.date } : undefined,
        title: dto.title ? { ...dto.title } : undefined,
        tone: dto.tone,
        order: dto.order,
        published: dto.published,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.news.delete({ where: { id } });
    return { ok: true };
  }
}
