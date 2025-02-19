export abstract class BaseModel {
  id: string;
  createdAt: Date;

  constructor(input: { id: string; createdAt: Date }) {
    this.id = input.id;
    this.createdAt = input.createdAt;
  }
}
