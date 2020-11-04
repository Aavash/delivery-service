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
exports.CustomerAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const customer_repository_1 = require("../customer.repository");
const typeorm_1 = require("@nestjs/typeorm");
const getUserJwtToken_helper_1 = require("../../../common/jwt/getUserJwtToken.helper");
let CustomerAuthService = class CustomerAuthService {
    constructor(customerRepository, jwtService) {
        this.customerRepository = customerRepository;
        this.jwtService = jwtService;
    }
    async setPassword(setPasswordDto) {
        if (setPasswordDto.password !== setPasswordDto.confirm_password) {
            throw new common_1.HttpException('Password is not valid', common_1.HttpStatus.BAD_REQUEST);
        }
        const customer = await this.customerRepository.setPassword(setPasswordDto);
        if (customer) {
            return { message: 'Password was set successfully' };
        }
        else {
            throw new common_1.HttpException('Invalid or Expired Token', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async signIn(loginCredentialsDto) {
        const customer = await this.customerRepository.authenticateCustomer(loginCredentialsDto);
        if (!customer) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const { accessToken, expires_in } = await getUserJwtToken_helper_1.getUserJwtToken(customer, this.jwtService);
        return { accessToken, expires_in };
    }
};
CustomerAuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(customer_repository_1.CustomerRepository)),
    __metadata("design:paramtypes", [customer_repository_1.CustomerRepository,
        jwt_1.JwtService])
], CustomerAuthService);
exports.CustomerAuthService = CustomerAuthService;
//# sourceMappingURL=customerAuth.service.js.map