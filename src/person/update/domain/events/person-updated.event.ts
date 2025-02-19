import { PersonUpdateCommand } from '../../application/commands/person-update.command';

export class PersonUpdateEvent {
  constructor(public readonly person: PersonUpdateCommand) {}

  static create(person: PersonUpdateCommand): PersonUpdateEvent {
    return new PersonUpdateEvent(person);
  }
}
