import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BrokerLoggingInterceptor implements NestInterceptor {
  private logger = new Logger();

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    const kafkaContext = _context.switchToRpc().getContext<Record<string, any>>();
    const kafkaMessage = kafkaContext.getMessage ? kafkaContext.getMessage() : {};
    const topic = kafkaContext ? kafkaContext.getTopic() : 'unknown-topic';
    const context = _context.getClass()?.name ?? BrokerLoggingInterceptor.name;

    this.logger.log(`<- Receiving a new message [${topic}]: ${JSON.stringify(kafkaMessage.value)}`, context);

    return next.handle();
  }
}
