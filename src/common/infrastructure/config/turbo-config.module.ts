import { AppConfigModule } from './app/app.config.module';
import { Module } from '@nestjs/common';
import { SwaggerConfigModule } from './swagger/swagger.config.module';
import { GlobalConfigModule } from './global/global.config.module';

@Module({
  imports: [AppConfigModule, SwaggerConfigModule, GlobalConfigModule],
  providers: [],
  exports: [AppConfigModule]
})
export class TurboConfigModule {}
