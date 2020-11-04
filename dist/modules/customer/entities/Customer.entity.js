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
exports.Customer = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const base_entity_1 = require("../../../common/entitities/base.entity");
const DeliveryRequest_entity_1 = require("../../delivery/entities/DeliveryRequest.entity");
const common_enum_1 = require("../../../common/constants/common.enum");
let Customer = class Customer extends base_entity_1.CustomBaseEntity {
};
__decorate([
    typeorm_1.Column('varchar', { length: 150, name: 'first_name' }),
    __metadata("design:type", String)
], Customer.prototype, "full_name", void 0);
__decorate([
    class_transformer_1.Exclude({ toPlainOnly: true }),
    typeorm_1.Column('varchar', { length: 150, name: 'password', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('boolean', {
        name: 'is_password_set',
        default: () => 'false',
    }),
    __metadata("design:type", Boolean)
], Customer.prototype, "is_password_set", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 150, name: 'email', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 150, name: 'gender', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        length: 150,
        name: 'mobile_number_ext',
    }),
    __metadata("design:type", String)
], Customer.prototype, "mobile_number_ext", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 150, name: 'mobile_number' }),
    __metadata("design:type", String)
], Customer.prototype, "mobile_number", void 0);
__decorate([
    typeorm_1.Column('date', { name: 'date_of_birth', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "date_of_birth", void 0);
__decorate([
    typeorm_1.Column('boolean', {
        name: 'is_active',
        default: () => 'true',
    }),
    __metadata("design:type", Boolean)
], Customer.prototype, "is_active", void 0);
__decorate([
    typeorm_1.Column('boolean', {
        default: () => 'false',
        name: 'is_completely_registered',
    }),
    __metadata("design:type", Boolean)
], Customer.prototype, "is_completely_registered", void 0);
__decorate([
    typeorm_1.OneToMany(() => DeliveryRequest_entity_1.DeliveryRequest, request => request.customer, {
        eager: false,
    }),
    __metadata("design:type", Array)
], Customer.prototype, "delivery_requests", void 0);
Customer = __decorate([
    typeorm_1.Entity()
], Customer);
exports.Customer = Customer;
//# sourceMappingURL=Customer.entity.js.map