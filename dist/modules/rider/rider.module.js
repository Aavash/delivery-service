"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const RiderProfileRequest_entity_1 = require("./entities/RiderProfileRequest.entity");
const OtpLogs_entity_1 = require("../auth/entities/OtpLogs.entity");
const requestApproval_service_1 = require("./services/requestApproval.service");
const requestApproval_controller_1 = require("./controllers/requestApproval.controller");
const minio_client_1 = require("../minio-client");
const config_1 = __importDefault(require("../../config"));
const Rider_entity_1 = require("./entities/Rider.entity");
const profileRequest_controller_1 = require("./controllers/profileRequest.controller");
const profileRequest_service_1 = require("./services/profileRequest.service");
let RiderModule = class RiderModule {
};
RiderModule = __decorate([
    common_1.Module({
        imports: [
            minio_client_1.NestMinioModule.register({
                endPoint: 'localhost',
                port: config_1.default.minio.MINIO_PORT,
                useSSL: false,
                accessKey: config_1.default.minio.MINIO_ACCESSKEY,
                secretKey: config_1.default.minio.MINIO_SECRETKEY
            }),
            typeorm_1.TypeOrmModule.forFeature([RiderProfileRequest_entity_1.RiderProfileRequest, OtpLogs_entity_1.OtpLogs, Rider_entity_1.Rider])
        ],
        controllers: [requestApproval_controller_1.RequestApprovalController, profileRequest_controller_1.ProfileRequestController],
        providers: [requestApproval_service_1.ProfileApprovalService, profileRequest_service_1.ProfileRequestService]
    })
], RiderModule);
exports.RiderModule = RiderModule;
//# sourceMappingURL=rider.module.js.map