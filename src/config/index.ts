import * as dotenv from 'dotenv';
import { decrypt } from '../utils/cipher';

let path: string;

switch (process.env.NODE_ENV) {
	case 'test':
		path = `${__dirname}/../../env/test.env`;
		break;
	case 'prod':
		path = `${__dirname}/../../env/prod.env`;
		break;
	default:
		path = `${__dirname}/../../env/dev.env`;
}

dotenv.config({ path, debug: false });

const config = {
	secret: 'SECRET!@',
	expiresIn: '30d',
	port: process.env.APP_PORT,
	db: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		key: process.env.KEY,
		iv: process.env.IV,
	},
	kafkaBroker: process.env.KAFKA_BROKER,
	redisPort: process.env.REDIS_PORT,
	mailConfig: {
		user: 'testrosebay@gmail.com',
		pass: 'fiqzfcqmertbketo',
	},
	mailService: 'gmail',
	minio: {
		MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
		MINIO_PORT: parseInt(process.env.MINIO_PORT),
		MINIO_ACCESSKEY: process.env.MINIO_ACCESSKEY,
		MINIO_SECRETKEY: process.env.MINIO_SECRETKEY,
		MINIO_BUCKET: process.env.MINIO_BUCKET
	}
};

export default config;
