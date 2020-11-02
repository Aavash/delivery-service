import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { isObjectEmpty } from '../../utils/helperFunctions.utils';
import moment from 'moment';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private readonly logger = new Logger('RequestLog');

	use(req: Request, res: Response, next: () => void): void {
		this.logger.log('**************'.repeat(10))
		this.logger.log(`Access time: ${moment().toString()}`);
		if (!isObjectEmpty(req.baseUrl)) {
			this.logger.log(`Url: ${JSON.stringify(req.baseUrl)}`);
		}
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
