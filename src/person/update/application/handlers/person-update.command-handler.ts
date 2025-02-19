import { Inject, Logger } from '@nestjs/common';
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { PersonUpdateCommandToDto } from '../mappers/product-update-command-to-dto.mapper';
import { Person } from 'src/person/shared/domain/person.domain';
import { PersonCreateCommand } from 'src/person/create/application/commands/person-create.command';
import { PersonRepository } from 'src/person/shared/domain/repositories/person.repository';
import { PersonUpdateCommand } from '../commands/person-update.command';
import { PersonUpdateEvent } from '../../domain/events/person-updated.event';

@CommandHandler(PersonUpdateCommand)
export class PersonUpdateHandler implements ICommandHandler<PersonUpdateCommand> {
  private readonly logger = new Logger(PersonUpdateHandler.name);

  constructor(
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
    @Inject('PersonRepository') private readonly repository: PersonRepository
  ) {}

  public async execute(input: PersonUpdateCommand): Promise<Person> {
    try {
      const existing = await this.repository.findOne({ id: input.id });
      if (existing) return this.commandBus.execute(PersonCreateCommand.create(input));

      await this.repository.update(PersonUpdateCommandToDto.map(input));
      await this.eventBus.publish(PersonUpdateEvent.create(input));
      return existing;
    } catch (error) {
      this.logger.error(`Error handling input: ${error?.message}`);
      throw error;
    }
  }
}
