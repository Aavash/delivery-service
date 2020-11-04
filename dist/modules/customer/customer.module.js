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
exports.CustomerModule = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("./services/customer.service");
const customer_controller_1 = require("./controllers/customer.controller");
const typeorm_1 = require("@nestjs/typeorm");
const customerAuth_controller_1 = require("./controllers/customerAuth.controller");
const customerAuth_service_1 = require("./services/customerAuth.service");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = __importDefault(require("../../config"));
const customer_repository_1 = require("./customer.repository");
const OtpLogs_entity_1 = require("../auth/entities/OtpLogs.entity");
let CustomerModule = class CustomerModule {
};
CustomerModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([customer_repository_1.CustomerRepository, OtpLogs_entity_1.OtpLogs]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: config_1.default.secret,
                signOptions: {
                    expiresIn: config_1.default.expiresIn,
                }
            }),
        ],
        controllers: [customer_controller_1.CustomerController, customerAuth_controller_1.CustomerAuthController],
        providers: [customer_service_1.CustomerService, customerAuth_service_1.CustomerAuthService]
    })
], CustomerModule);
exports.CustomerModule = CustomerModule;
//# sourceMappingURL=customer.module.js.map