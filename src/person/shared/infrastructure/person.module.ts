import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonCreateHandler } from '../../create/application/handlers/person-create.command-handler';
import { PersonEntity } from './entities/person.entity';
import { PersonMySqlRepository } from './repositories/person.repository';
import { BrokerModule } from '../../../common/broker/broker.module';
import { CqrsModule } from '@nestjs/cqrs';
import { PersonListener } from './listeners/person.listener';
import { PersonUpdateHandler } from 'src/person/update/application/handlers/person-update.command-handler';
import { PersonController } from './controllers/person.controller';
import { PersonCreatedEventHandlerLog } from 'src/person/create/application/handlers/person-created.event-handler-log';
import { PersonUpdatedEventHandlerLog } from 'src/person/update/application/handlers/person-updated.event-handler';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity]), BrokerModule, CqrsModule],
  providers: [
    PersonCreateHandler,
    PersonCreatedEventHandlerLog,
    PersonUpdateHandler,
    PersonUpdatedEventHandlerLog,
    {
      provide: 'PersonRepository',
      useClass: PersonMySqlRepository
    }
  ],
  controllers: [PersonController, PersonListener]
})
export class PersonModule {}
