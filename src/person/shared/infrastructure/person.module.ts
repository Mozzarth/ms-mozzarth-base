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
import { PersonUpdatedEventHandlerLog } from 'src/person/update/application/events/person-updated.event-handler';
import { PersonCreatedEventHandlerLog } from 'src/person/create/application/events/person-created.event-handler-log';
import { PersonCreatedEventHandlerProducer } from 'src/person/create/application/events/person-created.event-handler-producer';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity]), BrokerModule, CqrsModule],
  providers: [
    PersonUpdateHandler,
    PersonCreateHandler,
    PersonCreatedEventHandlerLog,
    PersonUpdatedEventHandlerLog,
    PersonCreatedEventHandlerProducer,
    {
      provide: 'PersonRepository',
      useClass: PersonMySqlRepository
    }
  ],
  controllers: [PersonController, PersonListener]
})
export class PersonModule {}
