import { AppConfigModule } from './app/app.config.module';
import { Module } from '@nestjs/common';
import { SwaggerConfigModule } from './swagger/swagger.config.module';
import { GlobalConfigModule } from './global/global.config.module';

@Module({
  providers: [],
  exports: [AppConfigModule],
  imports: [AppConfigModule, SwaggerConfigModule, GlobalConfigModule]
})
export class InfraConfigurationModule {}
