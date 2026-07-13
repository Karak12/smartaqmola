import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestsService {
  constructor(private readonly prisma: PrismaService) {}

  private ticket(): string {
    return `SA-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  create(dto: CreateRequestDto) {
    return this.prisma.request.create({
      data: {
        ticket: this.ticket(),
        category: dto.category ?? '',
        message: dto.message,
        address: dto.address ?? '',
      },
    });
  }

  findAll(status?: RequestStatus) {
    return this.prisma.request.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.request.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Заявка не найдена');
    return item;
  }

  async update(id: string, dto: UpdateRequestDto) {
    await this.findOne(id);
    return this.prisma.request.update({
      where: { id },
      data: {
        status: dto.status,
        category: dto.category,
        message: dto.message,
        address: dto.address,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.request.delete({ where: { id } });
    return { ok: true };
  }
}
