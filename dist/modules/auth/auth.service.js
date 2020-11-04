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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const OtpLogs_entity_1 = require("./entities/OtpLogs.entity");
const typeorm_2 = require("@nestjs/typeorm");
const common_enum_1 = require("../../common/constants/common.enum");
const customer_repository_1 = require("../customer/customer.repository");
const getUserJwtToken_helper_1 = require("../../common/jwt/getUserJwtToken.helper");
const jwt_1 = require("@nestjs/jwt");
const Rider_entity_1 = require("../rider/entities/Rider.entity");
const auth_validator_1 = require("./auth.validator");
let AuthService = class AuthService {
    constructor(otpLogsRepository, jwtService, connection, authValidator) {
        this.otpLogsRepository = otpLogsRepository;
        this.jwtService = jwtService;
        this.connection = connection;
        this.authValidator = authValidator;
        this.customerRepository = this.connection.getCustomRepository(customer_repository_1.CustomerRepository);
        this.riderRepository = this.connection.getRepository(Rider_entity_1.Rider);
    }
    generateToken() {
        return '1234';
    }
    async sendOtp(otpSendDto) {
        const { mobile_number, mobile_number_ext } = otpSendDto;
        await this.authValidator.validateRiderProfileRequestExists(mobile_number, mobile_number_ext);
        await this.otpLogsRepository.save(Object.assign(Object.assign({}, otpSendDto), { token: this.generateToken(), type: common_enum_1.VerificationType.LOGIN, status: common_enum_1.VerificationStatusEnum.UNCLAIMED })).then(otpLog => {
            this.otpLogsRepository.save({
                id: otpLog.id,
                is_otp_sent: true
            });
            return otpLog;
        });
        return { message: 'Otp Sent successfully' };
    }
    async authenticateMobile(authDto) {
        const { mobile_number, mobile_number_ext } = authDto;
        let userRepository = null;
        const otpLog = await this.otpLogsRepository.findOne({
            where: Object.assign(Object.assign({}, authDto), { type: common_enum_1.VerificationType.LOGIN, status: common_enum_1.VerificationStatusEnum.UNCLAIMED })
        });
        if (otpLog && otpLog.user_type == common_enum_1.UserTypeEnum.CUSTOMER) {
            userRepository = this.customerRepository;
        }
        else if (otpLog && otpLog.user_type == common_enum_1.UserTypeEnum.RIDER) {
            userRepository = this.riderRepository;
            await this.authValidator.validateRiderProfileRequestExists(mobile_number, mobile_number_ext);
        }
        else {
            throw new common_1.HttpException('Invalid or expired token', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await userRepository.findOne({
            where: { mobile_number, mobile_number_ext }
        });
        if (user) {
            const { accessToken, expires_in } = await getUserJwtToken_helper_1.getUserJwtToken(user, this.jwtService);
            await this.otpLogsRepository.save(Object.assign(Object.assign({}, otpLog), { status: common_enum_1.VerificationStatusEnum.EXPIRED }));
            return { accessToken, expires_in, user_exists: true };
        }
        else {
            await this.otpLogsRepository.save(Object.assign(Object.assign({}, otpLog), { status: common_enum_1.VerificationStatusEnum.ACTIVE }));
            return { user_exists: false, token_id: otpLog.idx };
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(OtpLogs_entity_1.OtpLogs)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService,
        typeorm_1.Connection,
        auth_validator_1.AuthAPIValidators])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map