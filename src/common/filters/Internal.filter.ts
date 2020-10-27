import { Response } from 'express';
import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	InternalServerErrorException,
} from '@nestjs/common';

@Catch(InternalServerErrorException)
export class InternalServerExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();

		response.status(status).json({
			statusCode: status,
			message: {
				message: 'Oops! Server Unavailable',
				sub:
					'Sorry, the servers are unavailable at the moment. Please try again later.',
			},
		});
	}
}
