"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerJwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const baseJwtStrategy_1 = require("../../common/jwt/baseJwtStrategy");
const Rider_entity_1 = require("./entities/Rider.entity");
let CustomerJwtStrategy = class CustomerJwtStrategy extends baseJwtStrategy_1.BaseJwtStrategy {
    async validate(payload) {
        const { idx } = payload;
        const employerRepository = await typeorm_1.getConnection().getRepository(Rider_entity_1.Rider);
        const user = await employerRepository.findOne({ where: { idx: idx } });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
CustomerJwtStrategy = __decorate([
    common_1.Injectable()
], CustomerJwtStrategy);
exports.CustomerJwtStrategy = CustomerJwtStrategy;
//# sourceMappingURL=rider.jwtStrategy.js.map