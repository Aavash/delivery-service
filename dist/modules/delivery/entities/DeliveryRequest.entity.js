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
exports.DeliveryRequest = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entitities/base.entity");
const common_enum_1 = require("../../../common/constants/common.enum");
const Customer_entity_1 = require("../../customer/entities/Customer.entity");
const Rider_entity_1 = require("../../rider/entities/Rider.entity");
const PackageDeliveryLocationRequest_entity_1 = require("./PackageDeliveryLocationRequest.entity");
const DeliveryRatingReview_entity_1 = require("./DeliveryRatingReview.entity");
let DeliveryRequest = class DeliveryRequest extends base_entity_1.CustomBaseEntity {
};
__decorate([
    typeorm_1.Column('varchar', { length: 150, name: 'title' }),
    __metadata("design:type", String)
], DeliveryRequest.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 150, name: 'name', nullable: true }),
    __metadata("design:type", String)
], DeliveryRequest.prototype, "request_note", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], DeliveryRequest.prototype, "approval_status", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", String)
], DeliveryRequest.prototype, "delivery_status", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Customer_entity_1.Customer, customer => customer.delivery_requests),
    __metadata("design:type", Customer_entity_1.Customer)
], DeliveryRequest.prototype, "customer", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Rider_entity_1.Rider, rider => rider.assigned_delivery_requests, { nullable: true }),
    __metadata("design:type", Rider_entity_1.Rider)
], DeliveryRequest.prototype, "assigned_to", void 0);
__decorate([
    typeorm_1.OneToMany(() => PackageDeliveryLocationRequest_entity_1.PackageDeliveryLocationRequest, location_request => location_request.delivery_request, {
        eager: false,
    }),
    __metadata("design:type", Array)
], DeliveryRequest.prototype, "package_locations", void 0);
__decorate([
    typeorm_1.OneToMany(() => DeliveryRatingReview_entity_1.DeliveryRatingReview, review => review.delivery_request, {
        eager: false,
    }),
    __metadata("design:type", Array)
], DeliveryRequest.prototype, "reviews", void 0);
DeliveryRequest = __decorate([
    typeorm_1.Entity()
], DeliveryRequest);
exports.DeliveryRequest = DeliveryRequest;
//# sourceMappingURL=DeliveryRequest.entity.js.map