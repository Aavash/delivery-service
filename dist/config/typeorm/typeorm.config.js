"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const index_1 = __importDefault(require("../index"));
const path_1 = require("path");
const deliveryServiceDb = {
    type: 'postgres',
    host: index_1.default.db.host,
    port: parseInt(index_1.default.db.port),
    username: index_1.default.db.username,
    password: index_1.default.db.password,
    database: index_1.default.db.database,
    synchronize: false,
    migrationsRun: String(true) === process.env.MIGRATION_RUN,
    logging: true,
    migrationsTableName: 'nest_migration',
    logger: 'advanced-console',
    subscribers: [path_1.join(__dirname, '/../../subscriber/*{.ts,.js}')],
    migrations: [path_1.join(__dirname, '/../../migrations/*{.ts,.js}')],
    entities: [
        path_1.join(__dirname, '/../../modules/**/entities/*.entity.{js,ts}'),
        path_1.join(__dirname, '/../../entities/*.entity.{js,ts}'),
    ],
    cli: {
        migrationsDir: path_1.join(__dirname, '/../../migrations'),
        entitiesDir: path_1.join(__dirname, '/../../modules/**/entities'),
    },
    extra: { max: 20 },
};
console.log(deliveryServiceDb);
module.exports = deliveryServiceDb;
//# sourceMappingURL=typeorm.config.js.map