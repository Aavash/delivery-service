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
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const typeorm_1 = require("@nestjs/typeorm");
const OtpLogs_entity_1 = require("./entities/OtpLogs.entity");
const customer_repository_1 = require("../customer/customer.repository");
const jwt_1 = require("@nestjs/jwt");
const config_1 = __importDefault(require("../../config"));
const auth_validator_1 = require("./auth.validator");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([OtpLogs_entity_1.OtpLogs]),
            jwt_1.JwtModule.register({
                secret: config_1.default.secret,
                signOptions: {
                    expiresIn: config_1.default.expiresIn,
                }
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, customer_repository_1.CustomerRepository, auth_validator_1.AuthAPIValidators]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map