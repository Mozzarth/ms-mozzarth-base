import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { PersonModule } from 'src/person/shared/infrastructure/person.module';

@Module({
  imports: [CommonModule, PersonModule]
})
export class AppModule {}
