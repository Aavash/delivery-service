"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserJwtToken = void 0;
const config_1 = __importDefault(require("../../config"));
async function getUserJwtToken(user, jwtService) {
    const payload = {
        idx: user.idx,
        full_name: user.function,
        mobile_number: user.mobile_number,
        mobile_number_ext: user.mobile_number_ext,
    };
    const accessToken = jwtService.sign(payload, {
        expiresIn: config_1.default.expiresIn,
    });
    return { accessToken, payload, expires_in: config_1.default.expiresIn };
}
exports.getUserJwtToken = getUserJwtToken;
//# sourceMappingURL=getUserJwtToken.helper.js.map