import { Inject, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { PersonRepository } from 'src/person/create/domain/repositories/person.repository';
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { PersonCreateCommand } from '../commands/person-create.command';
import { PersonCreateCommandToDto } from '../mappers/product-create-command-to-dto.mapper';
import { Person } from 'src/person/shared/domain/person.domain';
import { PersonCreatedEvent } from '../../domain/events/person-created.event';

@CommandHandler(PersonCreateCommand)
export class PersonCreateHandler implements ICommandHandler<PersonCreateCommand> {
  private readonly logger = new Logger(PersonCreateHandler.name);

  constructor(
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
    @Inject('PersonRepository') private readonly repository: PersonRepository
  ) {}

  public async execute(input: PersonCreateCommand): Promise<Person> {
    try {
      const existing = await this.repository.findOne({ id: input.id });

      if (existing) {
        const newPerson = await this.repository.save(PersonCreateCommandToDto.map(input));
        this.eventBus.publish(new PersonCreatedEvent(newPerson));
        return newPerson;
      }

      // TODO  actualizar propiedad por propiedad.
      // this.commandBus.execute(new PersonCreateCommand(_.merge(existing, input)));

      return this.repository.findOne({ id: input.id });
    } catch (error) {
      this.logger.error(`Error handling input: ${error?.message}`);
      throw error;
    }
  }
}
