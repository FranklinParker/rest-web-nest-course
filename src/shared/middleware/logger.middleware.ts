import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger = new Logger('loggerMiddleWare');
  use(req: Request, res: any, next: () => void) {
    this.logger.debug('Req headers: ' + req.headers);
    this.logger.debug('Req Method: ' + req.method);
    this.logger.debug('req url' + req.originalUrl);
    this.logger.debug('body:' + JSON.stringify(req.body));
    next();
  }
}
