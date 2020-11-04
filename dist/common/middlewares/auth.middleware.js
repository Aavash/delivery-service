"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleWare = void 0;
const common_1 = require("@nestjs/common");
const helperFunctions_utils_1 = require("../../utils/helperFunctions.utils");
const validator_1 = __importDefault(require("validator"));
let AuthMiddleWare = class AuthMiddleWare {
    async use(req, res, next) {
        if (req.headers.authorization === undefined) {
            throw new common_1.HttpException('Empty Authorization token', common_1.HttpStatus.BAD_REQUEST);
        }
        common_1.Logger.log('init');
        try {
            if (!helperFunctions_utils_1.isObjectEmpty(req.headers.authorization)) {
                let url = req.originalUrl;
                const urlArr = url.split('?');
                if (urlArr.length > 0) {
                    url = urlArr[0];
                }
                common_1.Logger.log('unmodified urlarry is ' + urlArr);
                url = url.replace(/\/$/, '');
                const finalRouteParam = url.split('/').pop();
                common_1.Logger.log('finalroute is ', finalRouteParam);
                common_1.Logger.log(url);
                if (validator_1.default.isUUID(finalRouteParam, 'all')) {
                    const array = url.split('/');
                    array.pop();
                    const requestUrl = array.join('/') + '/' + ':idx';
                    const jwtData = await helperFunctions_utils_1.Axios.post(`${process.env.AUTHENTICATER_URL}`, {
                        data: req.headers.authorization,
                        url: requestUrl,
                        method: req.method,
                    });
                    process.env.idx = jwtData.data.idx;
                    process.env.username = jwtData.data.username;
                    process.env.is_superadmin = jwtData.data.is_superadmin;
                }
                else {
                    const jwtData = await helperFunctions_utils_1.Axios.post(`${process.env.AUTHENTICATER_URL}`, {
                        data: req.headers.authorization,
                        url,
                        method: req.method,
                    });
                    process.env.idx = jwtData.data.idx;
                    process.env.username = jwtData.data.username;
                    process.env.is_superadmin = jwtData.data.is_superadmin;
                }
            }
            next();
        }
        catch (e) {
            if (e.response) {
                throw new common_1.HttpException(e.response.data, e.response.status);
            }
        }
    }
};
AuthMiddleWare = __decorate([
    common_1.Injectable()
], AuthMiddleWare);
exports.AuthMiddleWare = AuthMiddleWare;
//# sourceMappingURL=auth.middleware.js.map