import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';

@Injectable()
export class KpisService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateKpiDto) {
    return this.prisma.kpi.create({
      data: {
        icon: dto.icon,
        color: dto.color ?? '#2563EB',
        label: { ...dto.label },
        value: { ...dto.value },
        sub: { ...dto.sub },
        delta: dto.delta ?? '',
        deltaTone: dto.deltaTone ?? 'up',
        order: dto.order ?? 0,
      },
    });
  }

  findAll() {
    return this.prisma.kpi.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.kpi.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Показатель не найден');
    return item;
  }

  async update(id: string, dto: UpdateKpiDto) {
    await this.findOne(id);
    return this.prisma.kpi.update({
      where: { id },
      data: {
        icon: dto.icon,
        color: dto.color,
        label: dto.label ? { ...dto.label } : undefined,
        value: dto.value ? { ...dto.value } : undefined,
        sub: dto.sub ? { ...dto.sub } : undefined,
        delta: dto.delta,
        deltaTone: dto.deltaTone,
        order: dto.order,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.kpi.delete({ where: { id } });
    return { ok: true };
  }
}
