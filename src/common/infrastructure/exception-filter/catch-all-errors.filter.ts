import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class CatchAllErrorsFilter implements ExceptionFilter {
  private readonly logger = new Logger(CatchAllErrorsFilter.name);

  catch(exception: any, host: ArgumentsHost): any {
    this.logger.error(exception.stack);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof BadRequestException) {
      const errorMessages = exception.getResponse() as { message: string[]; error: string };
      const errorResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        error: JSON.stringify(errorMessages?.error ?? 'Bad Request'),
        message: (errorMessages?.message ?? []).join(', ') ?? 'Bad Request',
        validationErrors: (errorMessages?.message ?? []).map((message) => ({ message: message, name: 'Bad Request' }))
      };
      this.logger.error(`Error detail: ${JSON.stringify(exception.getResponse())}`);
      response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
    } else {
      const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
      const errorResponse = {
        statusCode: statusCode,
        error: this.getError(exception),
        message: this.formatMessage(exception)
      };
      this.logger.error(`Error detail: ${JSON.stringify(errorResponse)}`);
      response.status(statusCode).json(errorResponse);
    }
  }

  private getError(httpException: HttpException) {
    if (httpException instanceof HttpException)
      return (httpException?.getResponse() as Record<string, unknown>)['message'] || httpException.getResponse();
    else return (httpException as Error).message || 'Unknown error';
  }

  private formatMessage(exception: any) {
    if (exception instanceof EntityNotFoundError) {
      const entityMessage = exception.message.substring(0, exception.message.indexOf(' matching:'));
      const filteringObject = JSON.parse(exception.message.substring(exception.message.indexOf('{')));
      return `${entityMessage} with: ${JSON.stringify(filteringObject.where ?? filteringObject)}`;
    }
    return exception.message;
  }
}
