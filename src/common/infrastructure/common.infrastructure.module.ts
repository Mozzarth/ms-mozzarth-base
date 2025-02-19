import { Module } from '@nestjs/common';
import { HealthModule } from './controller/health/health.module';
import { TurboConfigModule } from './config/turbo-config.module';

@Module({
  imports: [TurboConfigModule, HealthModule],
  providers: [],
  exports: []
})
export class CommonInfrastructureModule {}
