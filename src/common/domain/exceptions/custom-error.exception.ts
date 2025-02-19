export class CatalogValidationError extends Error {
  errorCode: string;

  constructor(errorCode: string, message: string) {
    super(message);
    this.name = message;
    this.errorCode = errorCode;
  }
}
