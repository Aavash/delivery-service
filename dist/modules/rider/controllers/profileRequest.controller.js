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
exports.ProfileRequestController = void 0;
const common_1 = require("@nestjs/common");
const crud_1 = require("@nestjsx/crud");
const RiderProfileRequest_entity_1 = require("../entities/RiderProfileRequest.entity");
const swagger_1 = require("@nestjs/swagger");
const profileRequest_service_1 = require("../services/profileRequest.service");
let ProfileRequestController = class ProfileRequestController {
    constructor(service) {
        this.service = service;
    }
};
ProfileRequestController = __decorate([
    swagger_1.ApiTags('Rider'),
    crud_1.Crud({
        model: {
            type: RiderProfileRequest_entity_1.RiderProfileRequest
        },
        routes: {
            only: ['getManyBase',]
        },
        query: {
            maxLimit: 100,
            alwaysPaginate: true
        }
    }),
    common_1.Controller('rider/profile-requests'),
    __metadata("design:paramtypes", [profileRequest_service_1.ProfileRequestService])
], ProfileRequestController);
exports.ProfileRequestController = ProfileRequestController;
//# sourceMappingURL=profileRequest.controller.js.map