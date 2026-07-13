import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  NotFoundException,
  BadRequestException,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express, Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from './storage.service';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 МБ
const ALLOWED_TYPES = /(image\/(png|jpe?g|webp|gif|svg\+xml)|application\/pdf)/;

@Controller('files')
export class StorageController {
  constructor(
    private readonly storage: StorageService,
    private readonly prisma: PrismaService,
  ) {}

  // Загрузка файла (multipart/form-data, поле "file"). Только изображения и PDF,
  // не больше 10 МБ. Жёсткий лимит multer (15 МБ) защищает память как бэкстоп.
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 15 * 1024 * 1024 } }),
  )
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
          new FileTypeValidator({ fileType: ALLOWED_TYPES }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const stored = await this.storage.upload(
      file.buffer,
      file.originalname,
      file.mimetype,
    );
    const asset = await this.prisma.asset.create({ data: stored });
    const url = await this.storage.presignedUrl(asset.key);
    return { ...asset, url };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  list() {
    return this.prisma.asset.findMany({ orderBy: { createdAt: 'desc' } });
  }

  // Публичная стабильная ссылка на объект по ключу: редиректит на свежий
  // presigned-URL. Годится для <img src> и скачивания файлов на витрине.
  @Get('raw')
  async raw(@Query('key') key: string, @Res() res: Response) {
    if (!key) throw new BadRequestException('Не указан key');
    const url = await this.storage.presignedUrl(key);
    res.redirect(url);
  }

  // Временная ссылка для скачивания по id ассета.
  @Get(':id/url')
  async url(@Param('id') id: string) {
    const asset = await this.prisma.asset.findUnique({ where: { id } });
    if (!asset) throw new NotFoundException('Файл не найден');
    return { url: await this.storage.presignedUrl(asset.key) };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    const asset = await this.prisma.asset.findUnique({ where: { id } });
    if (!asset) throw new NotFoundException('Файл не найден');
    await this.storage.remove(asset.key);
    await this.prisma.asset.delete({ where: { id } });
    return { ok: true };
  }
}
