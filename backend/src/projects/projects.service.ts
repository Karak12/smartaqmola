import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        name: { ...dto.name },
        tagline: { ...dto.tagline },
        description: { ...dto.description },
        icon: dto.icon,
        color: dto.color ?? '#2563EB',
        status: { ...dto.status },
        year: dto.year,
        area: { ...dto.area },
        tags: dto.tags as unknown as Prisma.InputJsonValue,
        coverKey: dto.coverKey,
        order: dto.order ?? 0,
      },
    });
  }

  findAll() {
    return this.prisma.project.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.project.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Проект не найден');
    return item;
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);
    return this.prisma.project.update({
      where: { id },
      data: {
        name: dto.name ? { ...dto.name } : undefined,
        tagline: dto.tagline ? { ...dto.tagline } : undefined,
        description: dto.description ? { ...dto.description } : undefined,
        icon: dto.icon,
        color: dto.color,
        status: dto.status ? { ...dto.status } : undefined,
        year: dto.year,
        area: dto.area ? { ...dto.area } : undefined,
        tags: dto.tags
          ? (dto.tags as unknown as Prisma.InputJsonValue)
          : undefined,
        coverKey: dto.coverKey,
        order: dto.order,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.project.delete({ where: { id } });
    return { ok: true };
  }
}
