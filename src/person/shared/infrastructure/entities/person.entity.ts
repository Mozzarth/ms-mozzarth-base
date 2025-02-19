import { BaseEntity } from 'src/common/infrastructure/abstract-entities/base.entity';
import { Person } from 'src/person/shared/domain/person.domain';
import { Column, Entity } from 'typeorm';

@Entity('person')
export class PersonEntity extends BaseEntity implements Omit<Person, 'age'> {
  @Column()
  name: string;

  @Column()
  dateOfBirth: Date;
}
