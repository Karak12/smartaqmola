import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: config.get<string>('corsOrigin')?.split(',') ?? true,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist без forbidNonWhitelisted: неизвестные поля (напр. серверные
      // createdAt/updatedAt, приходящие обратно из формы) молча срезаются.
      whitelist: true,
      transform: true,
    }),
  );

  const port = config.get<number>('port') ?? 4000;
  await app.listen(port);
  Logger.log(`Smart Aqmola API → http://localhost:${port}/api`, 'Bootstrap');
}

void bootstrap();
