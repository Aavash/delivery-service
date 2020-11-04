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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const typeorm_1 = require("typeorm");
const Customer_entity_1 = require("./entities/Customer.entity");
const argon = __importStar(require("argon2"));
let CustomerRepository = class CustomerRepository extends typeorm_1.Repository {
    async setPassword(passwordDto) {
        const { mobile_number, mobile_number_ext } = passwordDto;
        const customer = await this.findOne({ mobile_number, mobile_number_ext });
        if (customer) {
            const pwdHash = await argon.hash(passwordDto.password);
            await this.save({
                id: customer.id,
                password: pwdHash,
                is_password_set: true
            });
        }
        return customer;
    }
    async authenticateCustomer(loginCredentialsDto) {
        const { mobile_number, mobile_number_ext, password } = loginCredentialsDto;
        const customer = await this.findOne({ mobile_number, mobile_number_ext });
        if (customer && await argon.verify(customer.password, password) && customer.is_active) {
            return customer;
        }
        else {
            return null;
        }
    }
};
CustomerRepository = __decorate([
    typeorm_1.EntityRepository(Customer_entity_1.Customer)
], CustomerRepository);
exports.CustomerRepository = CustomerRepository;
//# sourceMappingURL=customer.repository.js.map