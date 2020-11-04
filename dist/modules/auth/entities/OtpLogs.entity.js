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
exports.OtpLogs = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entitities/base.entity");
const common_enum_1 = require("../../../common/constants/common.enum");
const class_transformer_1 = require("class-transformer");
let OtpLogs = class OtpLogs extends base_entity_1.CustomBaseEntity {
};
__decorate([
    typeorm_1.Column('varchar', {
        length: 150,
        name: 'mobile_number_ext',
    }),
    __metadata("design:type", String)
], OtpLogs.prototype, "mobile_number_ext", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 150, name: 'mobile_number' }),
    __metadata("design:type", String)
], OtpLogs.prototype, "mobile_number", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        nullable: true,
        length: 10,
        name: 'token',
    }),
    __metadata("design:type", String)
], OtpLogs.prototype, "token", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        nullable: true,
        length: 1000,
        name: 'device_id',
    }),
    __metadata("design:type", String)
], OtpLogs.prototype, "device_id", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        nullable: true,
        length: 100,
        name: 'ip_address',
    }),
    __metadata("design:type", String)
], OtpLogs.prototype, "ip_address", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], OtpLogs.prototype, "type", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], OtpLogs.prototype, "status", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], OtpLogs.prototype, "user_type", void 0);
__decorate([
    class_transformer_1.Exclude({ toPlainOnly: true }),
    typeorm_1.Column('boolean', {
        default: () => 'false',
        name: 'is_otp_sent',
    }),
    __metadata("design:type", Boolean)
], OtpLogs.prototype, "is_otp_sent", void 0);
OtpLogs = __decorate([
    typeorm_1.Entity()
], OtpLogs);
exports.OtpLogs = OtpLogs;
//# sourceMappingURL=OtpLogs.entity.js.map