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
exports.SetPasswordDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class SetPasswordDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.MinLength(8),
    class_validator_1.MaxLength(20),
    class_validator_1.Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak. Must contain an uppercase, letter and special character' }),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], SetPasswordDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.MinLength(8),
    class_validator_1.MaxLength(20),
    class_validator_1.Matches(/((?=.*d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak. Must contain an uppercase, letter and special character' }),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], SetPasswordDto.prototype, "confirm_password", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.MinLength(4),
    class_validator_1.MaxLength(100),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], SetPasswordDto.prototype, "token", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(2),
    class_validator_1.MaxLength(5),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], SetPasswordDto.prototype, "mobile_number_ext", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(8),
    class_validator_1.MaxLength(12),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], SetPasswordDto.prototype, "mobile_number", void 0);
exports.SetPasswordDto = SetPasswordDto;
//# sourceMappingURL=setPassword.dto.js.map