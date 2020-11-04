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
exports.PackageDeliveryLocationRequest = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entitities/base.entity");
const DeliveryRequest_entity_1 = require("./DeliveryRequest.entity");
const common_enum_1 = require("../../../common/constants/common.enum");
let PackageDeliveryLocationRequest = class PackageDeliveryLocationRequest extends base_entity_1.CustomBaseEntity {
};
__decorate([
    typeorm_1.ManyToOne(() => DeliveryRequest_entity_1.DeliveryRequest, delivery_request => delivery_request.package_locations),
    __metadata("design:type", DeliveryRequest_entity_1.DeliveryRequest)
], PackageDeliveryLocationRequest.prototype, "delivery_request", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 150, name: 'latitude' }),
    __metadata("design:type", String)
], PackageDeliveryLocationRequest.prototype, "latitude", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 150, name: 'longitude' }),
    __metadata("design:type", String)
], PackageDeliveryLocationRequest.prototype, "longitude", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 150, name: 'title' }),
    __metadata("design:type", String)
], PackageDeliveryLocationRequest.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 150, name: 'request_note', nullable: true }),
    __metadata("design:type", String)
], PackageDeliveryLocationRequest.prototype, "request_note", void 0);
__decorate([
    typeorm_1.Column('boolean', { name: 'is_confidential', default: () => 'false' }),
    __metadata("design:type", Boolean)
], PackageDeliveryLocationRequest.prototype, "is_confidential", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], PackageDeliveryLocationRequest.prototype, "object_sensitivity", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], PackageDeliveryLocationRequest.prototype, "delivery_status", void 0);
PackageDeliveryLocationRequest = __decorate([
    typeorm_1.Entity()
], PackageDeliveryLocationRequest);
exports.PackageDeliveryLocationRequest = PackageDeliveryLocationRequest;
//# sourceMappingURL=PackageDeliveryLocationRequest.entity.js.map