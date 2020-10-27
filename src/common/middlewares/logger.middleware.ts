import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { isObjectEmpty } from '../../utils/helperFunctions.utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private readonly logger = new Logger('RequestLog');

	use(req: Request, res: Response, next: () => void): void {
		if (!isObjectEmpty(req.query)) {
			this.logger.log(`Query: ${JSON.stringify(req.query)}`);
		}
		if (!isObjectEmpty(req.params)) {
			this.logger.log(`Params: ${JSON.stringify(req.params)}`);
		}
		if (!isObjectEmpty(req.body)) {
			this.logger.log(`Body: ${JSON.stringify(req.body)}`);
		}
		next();
	}
}
