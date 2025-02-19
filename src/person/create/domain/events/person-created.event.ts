import { Person } from '../../../shared/domain/person.domain';

export class PersonCreatedEvent {
  constructor(public readonly person: Person) {}
}
