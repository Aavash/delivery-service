"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const Customer_entity_1 = require("../entities/Customer.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const OtpLogs_entity_1 = require("../../auth/entities/OtpLogs.entity");
const common_enum_1 = require("../../../common/constants/common.enum");
const customer_repository_1 = require("../customer.repository");
const jwt_1 = require("@nestjs/jwt");
const getUserJwtToken_helper_1 = require("../../../common/jwt/getUserJwtToken.helper");
let CustomerService = class CustomerService {
    constructor(jwtService, customerRepository, otpLogsRepository) {
        this.jwtService = jwtService;
        this.customerRepository = customerRepository;
        this.otpLogsRepository = otpLogsRepository;
    }
    async customerRegistration(dto) {
        const { full_name, otp_token, email, device_id } = dto;
        const otpLog = await this.otpLogsRepository.findOne({
            where: {
                device_id,
                idx: otp_token,
                status: common_enum_1.VerificationStatusEnum.ACTIVE,
                type: common_enum_1.VerificationType.LOGIN,
                user_type: common_enum_1.UserTypeEnum.CUSTOMER,
            }
        });
        if (!otpLog) {
            throw new common_1.HttpException('Token and Device could not be verified', common_1.HttpStatus.FORBIDDEN);
        }
        else {
            const customer = await this.customerRepository.save({
                full_name,
                email,
                mobile_number: otpLog.mobile_number,
                mobile_number_ext: otpLog.mobile_number_ext,
                is_completely_registered: true
            });
            const { access_token, expires_in } = await getUserJwtToken_helper_1.getUserJwtToken(customer, this.jwtService);
            await this.otpLogsRepository.save({
                id: otpLog.id,
                status: common_enum_1.VerificationStatusEnum.EXPIRED,
            });
            return { 'message': 'Customer Created Successfully', access_token, expires_in };
        }
    }
};
CustomerService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(Customer_entity_1.Customer)),
    __param(2, typeorm_1.InjectRepository(OtpLogs_entity_1.OtpLogs)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        customer_repository_1.CustomerRepository,
        typeorm_2.Repository])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map