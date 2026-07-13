import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProcurementDto } from './dto/create-procurement.dto';
import { UpdateProcurementDto } from './dto/update-procurement.dto';

@Injectable()
export class ProcurementService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateProcurementDto) {
    return this.prisma.procurementDoc.create({
      data: {
        groupKey: dto.groupKey,
        label: { ...dto.label },
        meta: dto.meta ? { ...dto.meta } : Prisma.JsonNull,
        badge: dto.badge ? { ...dto.badge } : Prisma.JsonNull,
        fileKey: dto.fileKey,
        order: dto.order ?? 0,
      },
    });
  }

  findAll(groupKey?: string) {
    return this.prisma.procurementDoc.findMany({
      where: groupKey ? { groupKey } : undefined,
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.procurementDoc.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Документ не найден');
    return item;
  }

  async update(id: string, dto: UpdateProcurementDto) {
    await this.findOne(id);
    return this.prisma.procurementDoc.update({
      where: { id },
      data: {
        groupKey: dto.groupKey,
        label: dto.label ? { ...dto.label } : undefined,
        meta: dto.meta ? { ...dto.meta } : undefined,
        badge: dto.badge ? { ...dto.badge } : undefined,
        fileKey: dto.fileKey,
        order: dto.order,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.procurementDoc.delete({ where: { id } });
    return { ok: true };
  }
}
