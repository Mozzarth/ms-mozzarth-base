import { Inject, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Person } from 'src/person/shared/domain/person.domain';
import { PersonCreatedEvent } from '../../domain/events/person-created.event';
import { PersonCreateCommand } from 'src/person/create/application/commands/person-create.command';
import { PersonRepository } from 'src/person/shared/domain/repositories/person.repository';
import { PersonCreateCommandToDto } from 'src/person/create/application/mappers/product-create-command-to-dto.mapper';
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
      const id = input.id;
      const existing = id ? await this.repository.findOne({ id: input.id }) : null;

      if (!existing) {
        const newPerson = await this.repository.save(PersonCreateCommandToDto.map(input));
        this.eventBus.publish(new PersonCreatedEvent(newPerson));
        return newPerson;
      }
      if (id) await this.commandBus.execute(PersonUpdateCommand.create({ id, ...input }));
      return this.repository.findOne({ id: input.id });
    } catch (error) {
      this.logger.error(`Error handling input: ${error?.message}`);
      throw error;
    }
  }
}
