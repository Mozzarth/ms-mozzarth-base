import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './swagger.config';
import { SwaggerConfigService } from './swagger.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    })
  ],
  providers: [SwaggerConfigService],
  exports: [SwaggerConfigService]
})
export class SwaggerConfigModule {}
