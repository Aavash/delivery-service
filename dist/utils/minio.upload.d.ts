declare class MinioUploadClient {
    private readonly minioClient;
    private readonly bucketName;
    constructor(bucketName?: string);
    uploadFile(file: any): Promise<string>;
}
export declare const minioClient: MinioUploadClient;
export {};
