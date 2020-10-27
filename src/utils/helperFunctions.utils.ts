import * as argon from 'argon2';
import { classToPlain } from 'class-transformer';
import { HttpException, Logger } from '@nestjs/common';
import * as redis from 'redis';
import axios from 'axios';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

// export const redisClient = redis.createClient(
// 	process.env.REDIS_PORT,
// 	process.env.REDIS_HOST,
// );

// redisClient.on('error', (err: string) => {
// 	Logger.log('Error ' + err, 'HelperFunctionsUtil');
// });
//
// redisClient.on('connect', () => {
// 	Logger.log('Redis Connected', 'HelperFunctionsUtil');
// });

export const isObjectEmpty = (obj: unknown): boolean => {
	return Object.keys(obj).length === 0;
};

export async function hashString(string: string): Promise<string> {
	return argon.hash(string, {
		type: argon.argon2d,
		hashLength: 50,
	});
}

export function arrayDiff(arr1: Array<any>, arr2: Array<any>): Array<any> {
	return arr1.filter(x => !arr2.includes(x));
}

export function hasNext(
	page: number,
	totalPages: number,
	hostAddress: string,
): string {
	if (page === totalPages) {
		return '';
	} else {
		return `${hostAddress.replace('\n', '')}?page=${page + 1}`;
	}
}

export function hasPrevious(
	page: number,
	totalPages: number,
	hostAddress: string,
): string {
	if (page <= 1) {
		return '';
	} else {
		return `${hostAddress.replace('\n', '')}?page=${page - 1}`;
	}
}

export function capitalize(s: string): string {
	return s && s[0].toUpperCase() + s.slice(1);
}

export function format(str: string | number): string | number {
	return str.toString().length === 1 ? '0' + str : str;
}

export function getFormattedDate(str: string): string {
	const todayTime = new Date(str);
	const month = format(todayTime.getMonth() + 1);
	const day = format(todayTime.getDate());
	const year = todayTime.getFullYear();

	
return day + '/' + month + '/' + year;
}

export function objectArrayToArray(
	objectArray: Array<any>,
	attr: string,
): Array<any> {
	return objectArray.map((el: { [x: string]: any }) => {
		return el[attr];
	});
}

export function paginate(
	pages: number,
	page: number,
	total: number,
	host: string,
	result: Array<any>,
): Ipagination {
	return {
		total_pages: pages,
		total_items: total,
		next: hasNext(page, pages, host),
		previous: hasPrevious(page, pages, host),
		current_page: page,
		items: classToPlain(result),
	};
}

export function serialize<T>(obj: T): T {
	const toRemove: Array<string> = [
		'id',
		'is_obsolete',
		'is_superadmin',
		'modified_on',
		'password',
	];

	if (obj.hasOwnProperty('items')) {
		for (const element of obj['items']) {
			for (const key of Object.keys(element)) {
				if (toRemove.includes(key)) {
					delete element[key];
				}
			}
		}
		
return obj;
	}

	for (const key of Object.keys(obj)) {
		if (toRemove.includes(key)) {
			delete obj[key];
		}
	}
	
return obj;
}

export function cleanData(obj: unknown, toRemove: Array<string>): void {
	for (const key of Object.keys(obj)) {
		if (toRemove.includes(key)) {
			delete obj[key];
		}
	}
}

export function removeEmpty(obj: unknown): any {
	return Object.entries(obj).reduce(
		(a, [k, v]) => (v === null ? a : { ...a, [k]: v }),
		{},
	);
}

export function handleError(error: {
	response: {
		data: { message: string | Record<string, any>; statusCode: number };
	};
}): any {
	throw new HttpException(
		error.response.data.message,
		error.response.data.statusCode,
	);
}

export function parseJwt(token: string): any {
	const base64Url = token.split('.')[1]; // token you get
	const base64 = base64Url.replace('-', '+').replace('_', '/');

	
return JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
}

function getAxios() {
	Logger.log(
		path.resolve(`${__dirname}/../../${process.env.CERTIFICATE_VERIFY}`),
	);
	Logger.log(
		fs.existsSync(
			path.resolve(`${__dirname}/../../${process.env.CERTIFICATE_VERIFY}`),
		),
	);
	if (
		fs.existsSync(
			path.resolve(`${__dirname}/../../${process.env.CERTIFICATE_VERIFY}`),
		)
	) {
		Logger.log('CA cert Found');
		const certVerifyFile = fs.readFileSync(
			path.resolve(`${__dirname}/../../${process.env.CERTIFICATE_VERIFY}`),
		);

		return axios.create({
			httpsAgent: new https.Agent({
				ca: certVerifyFile,
			}),
		});
	}

	Logger.log('CA cert not Found');
	
return axios.create({
		httpsAgent: new https.Agent({
			rejectUnauthorized: false,
		}),
	});
}

export const Axios = getAxios();

export function ConvertToCSV(objArray: Array<any>): string {
	const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
	let str = '';

	for (let i = 0; i < array.length; i++) {
		let line = '';

		for (const index in array[i]) {
			if (line != '') line += ',';

			line += array[i][index];
		}

		str += line + '\n';
	}

	return str;
}
