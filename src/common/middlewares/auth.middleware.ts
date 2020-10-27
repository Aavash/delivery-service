import {
	HttpException,
	HttpStatus,
	Injectable,
	Logger,
	NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Axios, isObjectEmpty } from '../../utils/helperFunctions.utils';
import validator from 'validator';

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
	async use(req: Request, res: Response, next: () => void) {
		if (req.headers.authorization === undefined) {
			throw new HttpException(
				'Empty Authorization token',
				HttpStatus.BAD_REQUEST,
			);
		}
		Logger.log('init');
		try {
			if (!isObjectEmpty(req.headers.authorization)) {
				let url = req.originalUrl;
				const urlArr = url.split('?');

				if (urlArr.length > 0) {
					url = urlArr[0];
				}
				Logger.log('unmodified urlarry is ' + urlArr);
				url = url.replace(/\/$/, '');

				const finalRouteParam = url.split('/').pop();

				Logger.log('finalroute is ', finalRouteParam);
				Logger.log(url);
				if (validator.isUUID(finalRouteParam, 'all')) {
					const array = url.split('/');

					array.pop();
					const requestUrl = array.join('/') + '/' + ':idx';


					const jwtData = await Axios.post(`${process.env.AUTHENTICATER_URL}`, {
						data: req.headers.authorization,
						url: requestUrl,
						method: req.method,
					});

					process.env.idx = jwtData.data.idx;
					process.env.username = jwtData.data.username;
					process.env.is_superadmin = jwtData.data.is_superadmin;
				} else {
					const jwtData = await Axios.post(`${process.env.AUTHENTICATER_URL}`, {
						data: req.headers.authorization,
						url,
						method: req.method,
					});

					process.env.idx = jwtData.data.idx;
					process.env.username = jwtData.data.username;
					process.env.is_superadmin = jwtData.data.is_superadmin;
				}
			}
			next();
		} catch (e) {
			if (e.response) {
				throw new HttpException(e.response.data, e.response.status);
			}
		}
	}
}
