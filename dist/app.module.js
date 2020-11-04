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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const rider_module_1 = require("./modules/rider/rider.module");
const delivery_module_1 = require("./modules/delivery/delivery.module");
const customer_module_1 = require("./modules/customer/customer.module");
const typeorm_config_1 = __importDefault(require("./config/typeorm/typeorm.config"));
const typeorm_1 = require("@nestjs/typeorm");
const logger_middleware_1 = require("./common/middlewares/logger.middleware");
const auth_module_1 = require("./modules/auth/auth.module");
const minio_client_1 = require("./modules/minio-client");
const platform_express_1 = require("@nestjs/platform-express");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.default),
            rider_module_1.RiderModule,
            delivery_module_1.DeliveryModule,
            customer_module_1.CustomerModule,
            auth_module_1.AuthModule,
            minio_client_1.NestMinioModule.register({
                endPoint: 'play.min.io',
                port: 9000,
                useSSL: true,
                accessKey: 'Q3AM3UQ867SPQQA43P2F',
                secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
            }),
            platform_express_1.MulterModule.register({
                dest: '/data',
            })
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map