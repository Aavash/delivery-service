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
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const helperFunctions_utils_1 = require("../../utils/helperFunctions.utils");
const moment_1 = __importDefault(require("moment"));
let LoggerMiddleware = class LoggerMiddleware {
    constructor() {
        this.logger = new common_1.Logger('RequestLog');
    }
    use(req, res, next) {
        this.logger.log('**************'.repeat(10));
        this.logger.log(`Access time: ${moment_1.default().toString()}`);
        if (!helperFunctions_utils_1.isObjectEmpty(req.baseUrl)) {
            this.logger.log(`Url: ${JSON.stringify(req.baseUrl)}`);
        }
        if (!helperFunctions_utils_1.isObjectEmpty(req.query)) {
            this.logger.log(`Query: ${JSON.stringify(req.query)}`);
        }
        if (!helperFunctions_utils_1.isObjectEmpty(req.params)) {
            this.logger.log(`Params: ${JSON.stringify(req.params)}`);
        }
        if (!helperFunctions_utils_1.isObjectEmpty(req.body)) {
            this.logger.log(`Body: ${JSON.stringify(req.body)}`);
        }
        next();
    }
};
LoggerMiddleware = __decorate([
    common_1.Injectable()
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map