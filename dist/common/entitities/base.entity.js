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
exports.CustomBaseEntity = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
class CustomBaseEntity extends typeorm_1.BaseEntity {
}
__decorate([
    class_transformer_1.Exclude({ toPlainOnly: true }),
    typeorm_1.PrimaryGeneratedColumn({
        type: 'integer',
        name: 'id',
    }),
    __metadata("design:type", Number)
], CustomBaseEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Generated('uuid'),
    typeorm_1.Column({ readonly: true }),
    __metadata("design:type", String)
], CustomBaseEntity.prototype, "idx", void 0);
__decorate([
    class_transformer_1.Exclude({ toPlainOnly: true }),
    typeorm_1.Column('boolean', {
        default: () => 'false',
        name: 'is_obsolete',
    }),
    __metadata("design:type", Boolean)
], CustomBaseEntity.prototype, "is_obsolete", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], CustomBaseEntity.prototype, "created_on", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], CustomBaseEntity.prototype, "modified_on", void 0);
exports.CustomBaseEntity = CustomBaseEntity;
//# sourceMappingURL=base.entity.js.map