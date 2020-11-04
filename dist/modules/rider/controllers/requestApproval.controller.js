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
exports.RequestApprovalController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const requestApproval_service_1 = require("../services/requestApproval.service");
const otpBasedRegistrationDto_1 = require("../../../common/dtos/otpBasedRegistrationDto");
const riderProfileCreate_dto_1 = require("../dtos/riderProfileCreate.dto");
let RequestApprovalController = class RequestApprovalController {
    constructor(riderProfileRequestService) {
        this.riderProfileRequestService = riderProfileRequestService;
    }
    async profileRequest(files, registrationDto) {
        return await this.riderProfileRequestService.profileRequest(registrationDto, files);
    }
    async profileApprove(profileCreateDto) {
        return await this.riderProfileRequestService.approveRequest(profileCreateDto);
    }
};
__decorate([
    common_1.Post('profile-request'),
    common_1.UseInterceptors(platform_express_1.FileFieldsInterceptor([
        { name: 'front_image', maxCount: 1 },
        { name: 'back_image', maxCount: 1 },
    ])),
    __param(0, common_1.UploadedFiles()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, otpBasedRegistrationDto_1.OtpBasedRegistrationDto]),
    __metadata("design:returntype", Promise)
], RequestApprovalController.prototype, "profileRequest", null);
__decorate([
    common_1.Post('profile-approve'),
    common_1.UsePipes(new common_1.ValidationPipe({ validationError: { target: false } })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [riderProfileCreate_dto_1.RiderProfileCreateDto]),
    __metadata("design:returntype", Promise)
], RequestApprovalController.prototype, "profileApprove", null);
RequestApprovalController = __decorate([
    common_1.Controller('rider'),
    __metadata("design:paramtypes", [requestApproval_service_1.ProfileApprovalService])
], RequestApprovalController);
exports.RequestApprovalController = RequestApprovalController;
//# sourceMappingURL=requestApproval.controller.js.map