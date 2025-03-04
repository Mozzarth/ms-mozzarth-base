import { BaseModel } from 'src/common/domain/model/base.model';

export class Person extends BaseModel {
  name: string;
  dateOfBirth: Date; // nacimiento dia mes año y hora

  constructor(input: { id: string; name: string; dateOfBirth: Date; createdAt: Date }) {
    super({ id: input.id, createdAt: input.createdAt });
    this.name = input.name;
    this.dateOfBirth = input.dateOfBirth;
  }

  get age(): number {
    return new Date().getFullYear() - this.dateOfBirth.getFullYear();
  }
}
