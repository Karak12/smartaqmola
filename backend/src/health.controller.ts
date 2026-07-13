import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return { status: 'ok', service: 'smart-aqmola-api', time: new Date().toISOString() };
  }
}
