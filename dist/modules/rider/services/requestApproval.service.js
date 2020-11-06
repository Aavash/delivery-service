"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileApprovalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const OtpLogs_entity_1 = require("../../auth/entities/OtpLogs.entity");
const common_enum_1 = require("../../../common/constants/common.enum");
const RiderProfileRequest_entity_1 = require("../entities/RiderProfileRequest.entity");
const crypto = __importStar(require("crypto"));
const Rider_entity_1 = require("../entities/Rider.entity");
let ProfileApprovalService = class ProfileApprovalService {
    constructor(riderRepository, riderProfileRequestRepository, otpLogsRepository) {
        this.riderRepository = riderRepository;
        this.riderProfileRequestRepository = riderProfileRequestRepository;
        this.otpLogsRepository = otpLogsRepository;
    }
    async profileRequest(registrationDto, files) {
        const { full_name, otp_token, email, device_id } = registrationDto;
        const otpLog = await this.otpLogsRepository.findOne({
            where: {
                device_id,
                idx: otp_token,
                status: common_enum_1.VerificationStatusEnum.ACTIVE,
                user_type: common_enum_1.UserTypeEnum.RIDER,
                type: common_enum_1.VerificationType.LOGIN,
            },
        });
        let front_image_name = Date.now().toString();
        let back_image_name = Date.now().toString();
        front_image_name = crypto.createHash('md5').update(front_image_name).digest('hex');
        back_image_name = crypto.createHash('md5').update(back_image_name).digest('hex');
        const noImageException = new common_1.HttpException('Enter both front and back verification images', common_1.HttpStatus.FORBIDDEN);
        if (!files) {
            throw noImageException;
        }
        else if ((!files.front_image[0] || !files.back_image[0])) {
            throw noImageException;
        }
        if (!otpLog) {
            throw new common_1.HttpException('Token and Device could not be verified', common_1.HttpStatus.FORBIDDEN);
        }
        else {
            await this.riderProfileRequestRepository.save({
                full_name,
                email,
                mobile_number: otpLog.mobile_number,
                mobile_number_ext: otpLog.mobile_number_ext,
                is_completely_registered: false,
                approval_status: common_enum_1.ApprovalStatusEnum.PENDING,
                front_image: front_image_name,
                back_image: back_image_name
            });
            await this.otpLogsRepository.save({
                id: otpLog.id,
                status: common_enum_1.VerificationStatusEnum.EXPIRED,
            });
            return { message: 'Successfully created profile request' };
        }
    }
    async approveRequest(profileCreateDto) {
        const request_idx = profileCreateDto.request_idx;
        const profileRequest = await this.riderProfileRequestRepository.findOne({
            where: {
                idx: request_idx,
                approval_status: common_enum_1.ApprovalStatusEnum.PENDING
            }
        });
        if (!profileRequest) {
            throw new common_1.HttpException('Pending rofile request does not exists', common_1.HttpStatus.BAD_REQUEST);
        }
        else if (profileRequest.rider) {
            throw new common_1.HttpException('Rider has already been approved', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            if (profileCreateDto.approval_status === common_enum_1.ApprovalStatusEnum.APPROVED) {
                const rider = await this.riderRepository.save({
                    profile_request: profileRequest,
                    full_name: profileRequest.full_name,
                    mobile_number_ext: profileRequest.mobile_number_ext,
                    mobile_number: profileRequest.mobile_number,
                    front_image: profileRequest.front_image,
                    back_image: profileRequest.back_image,
                    can_deliver_fragile: false,
                    can_deliver_sensitive: false,
                    is_active: true,
                    is_completely_registered: true
                });
                if (rider) {
                    await this.riderProfileRequestRepository.save({
                        id: profileRequest.id,
                        approval_status: profileCreateDto.approval_status,
                        approval_quote: profileCreateDto.approval_quote,
                    });
                    return { message: 'Rider Successfully Created' };
                }
            }
            else {
                await this.riderProfileRequestRepository.save({
                    id: profileRequest.id,
                    approval_status: profileCreateDto.approval_status,
                    approval_quote: profileCreateDto.approval_quote,
                });
                return { message: 'Request has been rejected' };
            }
        }
    }
};
ProfileApprovalService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(Rider_entity_1.Rider)),
    __param(1, typeorm_1.InjectRepository(RiderProfileRequest_entity_1.RiderProfileRequest)),
    __param(2, typeorm_1.InjectRepository(OtpLogs_entity_1.OtpLogs)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProfileApprovalService);
exports.ProfileApprovalService = ProfileApprovalService;
//# sourceMappingURL=requestApproval.service.js.map