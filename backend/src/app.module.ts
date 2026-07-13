import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { StorageModule } from './storage/storage.module';
import { NewsModule } from './news/news.module';
import { RequestsModule } from './requests/requests.module';
import { KpisModule } from './kpis/kpis.module';
import { ProjectsModule } from './projects/projects.module';
import { ProcurementModule } from './procurement/procurement.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    PrismaModule,
    AuthModule,
    StorageModule,
    NewsModule,
    RequestsModule,
    KpisModule,
    ProjectsModule,
    ProcurementModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
