"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
let path;
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
exports.default = config;
//# sourceMappingURL=index.js.map