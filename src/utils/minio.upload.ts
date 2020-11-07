import * as minio from 'minio';
import * as crypto from 'crypto';
import { HttpException, HttpStatus } from '@nestjs/common';


class MinioUploadClient {
  private readonly minioClient = undefined;
  private readonly bucketName = undefined;

  constructor(bucketName=process.env.MINIO_BUCKET) {
    const minioClient = new minio.Client({
        endPoint: process.env.MINIO_ENDPOINT,
        port: parseInt(process.env.MINIO_PORT),
        useSSL: false,
        accessKey: process.env.MINIO_ACCESS_KEY,
        secretKey: process.env.MINIO_SECRET_KEY
    });

    minioClient.bucketExists(bucketName, function(err, exists) {
    if (!exists) {
      minioClient.makeBucket(bucketName, 'us-east-1', function(err) {
        if (err) return console.error('Error creating bucket.', err);
        console.info('Bucket created successfully in "us-east-1".')
          },)
        }
      });
    this.minioClient = minioClient;
    this.bucketName = bucketName;

  }

  async uploadFile(file) {
    const hashedFileName = crypto.createHash('md5'
    ).update(Date.now().toString()).digest('hex');
    const fileName = `${hashedFileName}.${file.originalname.split('.').splice(-1)[0]}`;

    await this.minioClient.putObject(this.bucketName, fileName, file.buffer)
      .catch(error => {
        throw new HttpException('There was an error uploading file', HttpStatus.CONFLICT)
      });

    return `${this.bucketName}/${fileName}`
    }
}

export const minioClient = new MinioUploadClient();
