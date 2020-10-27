import { classToPlain } from 'class-transformer';
import * as argon from 'argon2';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import * as path from 'path';
import axios from 'axios';
import * as https from 'https';
import * as fs from 'fs';


export const isObjectEmpty = (obj: any): boolean => {
	return Object.keys(obj).length === 0;
};

export function hasNext(page: number, totalPages: number, hostAddress: string) {
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
) {
	if (page <= 1) {
		return '';
	} else {
		return `${hostAddress.replace('\n', '')}?page=${page - 1}`;
	}
}

export function paginate(pages, page, total, host, result) {
	return {
		total_pages: pages,
		total_items: total,
		next: hasNext(page, pages, host),
		previous: hasPrevious(page, pages, host),
		current_page: page,
		items: classToPlain(result),
	};
}

export function removeEmpty(obj) {
	return Object.entries(obj).reduce(
		(a, [k, v]) => (v === null ? a : { ...a, [k]: v }),
		{},
	);
}

export function parseJwt(token) {
	const base64Url = token.split('.')[1]; // token you get
	const base64 = base64Url.replace('-', '+').replace('_', '/');

	
return JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
}

export function cleanData(obj: any, toRemove: Array<string>) {
	for (const key of Object.keys(obj)) {
		if (toRemove.includes(key)) {
			delete obj[key];
		}
	}
}


export function validateUUID(idx: string) {
	if (!isUUID(idx, 'all')) {
		throw new HttpException('Invalid idx', HttpStatus.BAD_REQUEST);
	}
}

export function validateUUIDwithMessage(idx: string, message: string) {
	if (!isUUID(idx, 'all')) {
		throw new HttpException(`Invalid ${message}`, HttpStatus.BAD_REQUEST);
	}
}

export const fileName = OldName => {
	return (
		path.basename(OldName, path.extname(OldName)) +
		'-' +
		Date.now() +
		path.extname(OldName)
	);
};

export async function hashString(string): Promise<string> {
	return argon.hash(string, {
		type: argon.argon2d,
		hashLength: 50,
	});
}

function getAxios() {
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

export const formUrlEncoded = x =>
	Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');