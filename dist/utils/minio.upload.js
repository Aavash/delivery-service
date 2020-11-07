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
exports.minioClient = void 0;
const minio = __importStar(require("minio"));
const crypto = __importStar(require("crypto"));
const common_1 = require("@nestjs/common");
class MinioUploadClient {
    constructor(bucketName = process.env.MINIO_BUCKET) {
        this.minioClient = undefined;
        this.bucketName = undefined;
        const minioClient = new minio.Client({
            endPoint: process.env.MINIO_ENDPOINT,
            port: parseInt(process.env.MINIO_PORT),
            useSSL: false,
            accessKey: process.env.MINIO_ACCESS_KEY,
            secretKey: process.env.MINIO_SECRET_KEY
        });
        minioClient.bucketExists(bucketName, function (err, exists) {
            if (!exists) {
                minioClient.makeBucket(bucketName, 'us-east-1', function (err) {
                    if (err)
                        return console.error('Error creating bucket.', err);
                    console.info('Bucket created successfully in "us-east-1".');
                });
            }
        });
        this.minioClient = minioClient;
        this.bucketName = bucketName;
    }
    async uploadFile(file) {
        const hashedFileName = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
        const fileName = `${hashedFileName}.${file.originalname.split('.').splice(-1)[0]}`;
        await this.minioClient.putObject(this.bucketName, fileName, file.buffer)
            .catch(error => {
            console.debug(error);
            throw new common_1.HttpException('There was an error uploading file', common_1.HttpStatus.CONFLICT);
        });
        return `${this.bucketName}/${fileName}`;
    }
}
exports.minioClient = new MinioUploadClient();
//# sourceMappingURL=minio.upload.js.map