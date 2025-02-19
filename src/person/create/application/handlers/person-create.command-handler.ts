import { Inject, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { PersonCreateCommand } from '../commands/person-create.command';
import { PersonCreateCommandToDto } from '../mappers/product-create-command-to-dto.mapper';
import { Person } from 'src/person/shared/domain/person.domain';
import { PersonCreatedEvent } from '../../domain/events/person-created.event';
import { PersonRepository } from 'src/person/shared/domain/repositories/person.repository';
import { PersonUpdateCommand } from 'src/person/update/application/commands/person-update.command';

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
      if (!existing) return this.commandBus.execute(PersonUpdateCommand.create(input));

      const newPerson = await this.repository.save(PersonCreateCommandToDto.map(input));
      this.eventBus.publish(new PersonCreatedEvent(newPerson));
      return newPerson;
    } catch (error) {
      this.logger.error(`Error handling input: ${error?.message}`);
      throw error;
    }
  }
}
