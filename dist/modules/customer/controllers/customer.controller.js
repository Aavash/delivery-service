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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("../services/customer.service");
const crud_1 = require("@nestjsx/crud");
const Customer_entity_1 = require("../entities/Customer.entity");
const swagger_1 = require("@nestjs/swagger");
const otpBasedRegistrationDto_1 = require("../../../common/dtos/otpBasedRegistrationDto");
let CustomerController = class CustomerController {
    constructor(service) {
        this.service = service;
    }
};
CustomerController = __decorate([
    swagger_1.ApiTags('Customer'),
    crud_1.Crud({
        model: {
            type: Customer_entity_1.Customer
        },
        dto: {
            create: otpBasedRegistrationDto_1.OtpBasedRegistrationDto
        },
        routes: {
            only: ['createOneBase',]
        }
    }),
    common_1.Controller('customer/customer-register'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map