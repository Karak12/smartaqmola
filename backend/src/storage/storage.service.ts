import {
  Injectable,
  Logger,
  OnModuleInit,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client as MinioClient } from 'minio';
import { randomUUID } from 'node:crypto';

export interface StoredObject {
  key: string;
  bucket: string;
  filename: string;
  mimeType: string;
  size: number;
}

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(StorageService.name);
  private readonly client: MinioClient;
  readonly bucket: string;

  constructor(private readonly config: ConfigService) {
    const minio = this.config.get('minio', { infer: true }) as {
      endPoint: string;
      port: number;
      useSSL: boolean;
      accessKey: string;
      secretKey: string;
      bucket: string;
    };
    this.bucket = minio.bucket;
    this.client = new MinioClient({
      endPoint: minio.endPoint,
      port: minio.port,
      useSSL: minio.useSSL,
      accessKey: minio.accessKey,
      secretKey: minio.secretKey,
    });
  }

  // Создаём бакет при старте, если его ещё нет.
  async onModuleInit(): Promise<void> {
    try {
      const exists = await this.client.bucketExists(this.bucket);
      if (!exists) {
        await this.client.makeBucket(this.bucket);
        this.logger.log(`Бакет "${this.bucket}" создан`);
      }
    } catch (err) {
      // Не валим приложение, если MinIO ещё не поднят — только предупреждаем.
      this.logger.warn(
        `MinIO недоступен при старте (${(err as Error).message}). ` +
          'Бакет будет создан при первой загрузке.',
      );
    }
  }

  private async ensureBucket(): Promise<void> {
    const exists = await this.client.bucketExists(this.bucket);
    if (!exists) await this.client.makeBucket(this.bucket);
  }

  // Загрузка буфера. Возвращает метаданные объекта (ключ уникален).
  async upload(
    buffer: Buffer,
    originalName: string,
    mimeType: string,
  ): Promise<StoredObject> {
    try {
      await this.ensureBucket();
      const safe = originalName.replace(/[^\w.\-]+/g, '_');
      const key = `${new Date().getFullYear()}/${randomUUID()}-${safe}`;
      await this.client.putObject(this.bucket, key, buffer, buffer.length, {
        'Content-Type': mimeType,
      });
      return {
        key,
        bucket: this.bucket,
        filename: originalName,
        mimeType,
        size: buffer.length,
      };
    } catch (err) {
      this.logger.error(`Ошибка загрузки в MinIO: ${(err as Error).message}`);
      throw new InternalServerErrorException('Не удалось сохранить файл');
    }
  }

  // Временная (presigned) ссылка на скачивание.
  presignedUrl(key: string, expirySeconds = 60 * 60): Promise<string> {
    return this.client.presignedGetObject(this.bucket, key, expirySeconds);
  }

  async remove(key: string): Promise<void> {
    await this.client.removeObject(this.bucket, key);
  }
}
