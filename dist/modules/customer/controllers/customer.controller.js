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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("../services/customer.service");
const swagger_1 = require("@nestjs/swagger");
const otpBasedRegistrationDto_1 = require("../../../common/dtos/otpBasedRegistrationDto");
let CustomerController = class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async customerRegistration(dto) {
        return await this.customerService.customerRegistration(dto);
    }
    async linkThirdPartyLogin(dto) {
        return await this.customerService.customerRegistration(dto);
    }
};
__decorate([
    common_1.Post('/customer-register/'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otpBasedRegistrationDto_1.OtpBasedRegistrationDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "customerRegistration", null);
__decorate([
    common_1.Post('/link-third-party-login/'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [otpBasedRegistrationDto_1.OtpBasedRegistrationDto]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "linkThirdPartyLogin", null);
CustomerController = __decorate([
    swagger_1.ApiTags('Customer Profile creation'),
    common_1.Controller('customer'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map