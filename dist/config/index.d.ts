declare const config: {
    secret: string;
    expiresIn: string;
    port: string;
    db: {
        host: string;
        port: string;
        username: string;
        password: string;
        database: string;
        key: string;
        iv: string;
    };
    kafkaBroker: string;
    redisPort: string;
    mailConfig: {
        user: string;
        pass: string;
    };
    mailService: string;
    minio: {
        MINIO_ENDPOINT: string;
        MINIO_PORT: number;
        MINIO_ACCESSKEY: string;
        MINIO_SECRETKEY: string;
        MINIO_BUCKET: string;
    };
};
export default config;
