import config from '../index';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const deliveryServiceDb: ConnectionOptions = {
	type: 'postgres',
	host: config.db.host,
	port: parseInt(config.db.port),
	username: config.db.username,
	password: config.db.password,
	database: config.db.database,
	// We are using migrations, synchronize should be set to false.
	synchronize: false,
	migrationsRun: String(true) === process.env.MIGRATION_RUN,
	logging: true,
	migrationsTableName: 'nest_migration',
	logger: 'advanced-console',
	subscribers: [join(__dirname, '/../../subscriber/*{.ts,.js}')],
	migrations: [join(__dirname, '/../../migrations/*{.ts,.js}')],
	entities: [
		join(__dirname, '/../../modules/**/entities/*.entity.{js,ts}'),
		join(__dirname, '/../../entities/*.entity.{js,ts}'),
	],
	cli: {
		migrationsDir: join(__dirname, '/../../migrations'),
		entitiesDir: join(__dirname, '/../../modules/**/entities'),
	},
	extra: { max: 20 },
};


console.log(deliveryServiceDb);
export = deliveryServiceDb;

