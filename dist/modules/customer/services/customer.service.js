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
const crud_typeorm_1 = require("@nestjsx/crud-typeorm");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const OtpLogs_entity_1 = require("../../auth/entities/OtpLogs.entity");
const common_enum_1 = require("../../../common/constants/common.enum");
let CustomerService = class CustomerService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo, otpLogsRepository) {
        super(repo);
        this.otpLogsRepository = otpLogsRepository;
    }
    async createOne(req, dto) {
        const { full_name, otp_token, email } = dto;
        const otpLog = await this.otpLogsRepository.findOne({
            where: {
                idx: otp_token,
                status: common_enum_1.VerificationStatusEnum.ACTIVE,
                type: common_enum_1.VerificationType.LOGIN,
                user_type: common_enum_1.UserTypeEnum.CUSTOMER,
            }
        });
        if (!otpLog) {
            throw new common_1.HttpException('Token could not be verified', common_1.HttpStatus.FORBIDDEN);
        }
        else {
            const customer = await this.repo.save({
                full_name,
                email,
                mobile_number: otpLog.mobile_number,
                mobile_number_ext: otpLog.mobile_number_ext,
                is_completely_registered: true
            });
            await this.otpLogsRepository.save({
                id: otpLog.id,
                status: common_enum_1.VerificationStatusEnum.EXPIRED,
            });
            return customer;
        }
    }
};
CustomerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(Customer_entity_1.Customer)),
    __param(1, typeorm_1.InjectRepository(OtpLogs_entity_1.OtpLogs)),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map