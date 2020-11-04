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
exports.RiderProfileRequest = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const base_entity_1 = require("../../../common/entitities/base.entity");
const common_enum_1 = require("../../../common/constants/common.enum");
const Rider_entity_1 = require("./Rider.entity");
let RiderProfileRequest = class RiderProfileRequest extends base_entity_1.CustomBaseEntity {
};
__decorate([
    typeorm_1.OneToOne(() => Rider_entity_1.Rider, rider => rider.profile_request, { nullable: true }),
    __metadata("design:type", Rider_entity_1.Rider)
], RiderProfileRequest.prototype, "rider", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 150, name: 'first_name' }),
    __metadata("design:type", String)
], RiderProfileRequest.prototype, "full_name", void 0);
__decorate([
    class_transformer_1.Exclude({ toPlainOnly: true }),
    typeorm_1.Column('varchar', { length: 150, name: 'password', nullable: true }),
    __metadata("design:type", String)
], RiderProfileRequest.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('boolean', {
        name: 'is_password_set',
        default: () => 'false',
    }),
    __metadata("design:type", Boolean)
], RiderProfileRequest.prototype, "is_password_set", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 150, name: 'email', nullable: true }),
    __metadata("design:type", String)
], RiderProfileRequest.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 150, name: 'gender', nullable: true }),
    __metadata("design:type", String)
], RiderProfileRequest.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        length: 150,
        name: 'mobile_number_ext',
    }),
    __metadata("design:type", String)
], RiderProfileRequest.prototype, "mobile_number_ext", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 150, name: 'mobile_number' }),
    __metadata("design:type", String)
], RiderProfileRequest.prototype, "mobile_number", void 0);
__decorate([
    typeorm_1.Column('date', { name: 'date_of_birth', nullable: true }),
    __metadata("design:type", String)
], RiderProfileRequest.prototype, "date_of_birth", void 0);
__decorate([
    typeorm_1.Column('boolean', {
        name: 'is_active',
        default: () => 'true',
    }),
    __metadata("design:type", Boolean)
], RiderProfileRequest.prototype, "is_active", void 0);
__decorate([
    typeorm_1.Column('boolean', {
        default: () => 'false',
        name: 'is_completely_registered',
    }),
    __metadata("design:type", Boolean)
], RiderProfileRequest.prototype, "is_completely_registered", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], RiderProfileRequest.prototype, "approval_status", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 150, name: 'approval_quote', nullable: true }),
    __metadata("design:type", String)
], RiderProfileRequest.prototype, "approval_quote", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 1000, name: 'front_image' }),
    __metadata("design:type", String)
], RiderProfileRequest.prototype, "front_image", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 1000, name: 'back_image' }),
    __metadata("design:type", String)
], RiderProfileRequest.prototype, "back_image", void 0);
RiderProfileRequest = __decorate([
    typeorm_1.Entity()
], RiderProfileRequest);
exports.RiderProfileRequest = RiderProfileRequest;
//# sourceMappingURL=RiderProfileRequest.entity.js.map