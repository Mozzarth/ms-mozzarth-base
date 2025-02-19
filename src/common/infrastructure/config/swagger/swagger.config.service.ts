import { INestApplication, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class SwaggerConfigService {
  constructor(private configService: ConfigService) {}

  get path(): string {
    return this.configService.get<string>('swagger.path');
  }

  buildDocument(app: INestApplication): OpenAPIObject {
    const config = new DocumentBuilder()
      .setTitle(this.configService.get<string>('swagger.tittle'))
      .setDescription(this.configService.get<string>('swagger.description'))
      .setVersion(this.configService.get<string>('swagger.path'))
      .addTag(this.configService.get<string>('swagger.nameTag'))
      .addBearerAuth()
      .build();
    return SwaggerModule.createDocument(app, config);
  }
}
