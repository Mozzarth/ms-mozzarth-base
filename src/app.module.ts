import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { PersonModule } from 'src/person/shared/infrastructure/person.module';
import { LogMiddleware } from './common/infrastructure/middleware/log.middleware';

@Module({
  imports: [CommonModule, PersonModule]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
