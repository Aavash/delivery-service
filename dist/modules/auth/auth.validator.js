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
exports.AuthAPIValidators = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const RiderProfileRequest_entity_1 = require("../rider/entities/RiderProfileRequest.entity");
const common_enum_1 = require("../../common/constants/common.enum");
let AuthAPIValidators = class AuthAPIValidators {
    constructor(connection) {
        this.connection = connection;
        this.riderProfileRequest = this.connection.getRepository(RiderProfileRequest_entity_1.RiderProfileRequest);
    }
    async validateRiderProfileRequestExists(mobile_number, mobile_number_ext) {
        const pendingRiderRequest = await this.riderProfileRequest.findOne({
            where: {
                mobile_number,
                mobile_number_ext,
                is_completely_registered: false,
                approval_status: common_enum_1.ApprovalStatusEnum.PENDING
            }
        });
        if (pendingRiderRequest) {
            throw new common_1.HttpException({
                approval_status: common_enum_1.ApprovalStatusEnum.PENDING,
                message: 'Rider has a pending profile approval.',
                status: common_1.HttpStatus.BAD_REQUEST
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return true;
    }
};
AuthAPIValidators = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], AuthAPIValidators);
exports.AuthAPIValidators = AuthAPIValidators;
//# sourceMappingURL=auth.validator.js.map