import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { context, trace } from '@opentelemetry/api';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const span = trace.getSpan(context.active());
    const traceId = span ? span.spanContext().traceId : 'no-trace';
    console.log(`[${traceId}] Request: ${req.method} ${req.url}`);
    next();
  }
}
