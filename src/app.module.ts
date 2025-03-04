import { MiddlewareConsumer, Module } from '@nestjs/common';
import { InfraModule } from './common/infrastructure/infrastructure.module';
import { PersonModule } from 'src/person/shared/infrastructure/person.module';
import { LogMiddleware } from './common/infrastructure/middleware/log.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), InfraModule, PersonModule]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
