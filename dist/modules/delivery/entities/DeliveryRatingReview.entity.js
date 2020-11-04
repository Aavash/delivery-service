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
exports.DeliveryRatingReview = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/entitities/base.entity");
const common_enum_1 = require("../../../common/constants/common.enum");
const DeliveryRequest_entity_1 = require("./DeliveryRequest.entity");
let DeliveryRatingReview = class DeliveryRatingReview extends base_entity_1.CustomBaseEntity {
};
__decorate([
    typeorm_1.ManyToOne(() => DeliveryRequest_entity_1.DeliveryRequest, delivery_request => delivery_request.reviews),
    __metadata("design:type", DeliveryRequest_entity_1.DeliveryRequest)
], DeliveryRatingReview.prototype, "delivery_request", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 150, name: 'name' }),
    __metadata("design:type", String)
], DeliveryRatingReview.prototype, "review", void 0);
__decorate([
    typeorm_1.Column('varchar'),
    __metadata("design:type", Number)
], DeliveryRatingReview.prototype, "RATING", void 0);
DeliveryRatingReview = __decorate([
    typeorm_1.Entity()
], DeliveryRatingReview);
exports.DeliveryRatingReview = DeliveryRatingReview;
//# sourceMappingURL=DeliveryRatingReview.entity.js.map