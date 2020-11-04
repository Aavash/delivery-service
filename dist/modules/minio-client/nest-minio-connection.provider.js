"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionFactory = void 0;
const constants_1 = require("./constants");
const nest_minio_service_1 = require("./nest-minio.service");
exports.connectionFactory = {
    provide: constants_1.MINIO_CONNECTION,
    useFactory: async (nestMinioService) => {
        return nestMinioService.getMinio();
    },
    inject: [nest_minio_service_1.NestMinioService],
};
//# sourceMappingURL=nest-minio-connection.provider.js.map