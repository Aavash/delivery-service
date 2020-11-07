"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const path_1 = require("path");
const helmet_1 = __importDefault(require("helmet"));
const express = __importStar(require("express"));
const compression_1 = __importDefault(require("compression"));
const core_1 = require("@nestjs/core");
const Internal_filter_1 = require("./common/filters/Internal.filter");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: console,
    });
    app.enableCors();
    app.setGlobalPrefix('v1');
    app.use(helmet_1.default());
    app.use(compression_1.default());
    app.use('/media', express.static(path_1.join(__dirname, '..', 'media')));
    app.useGlobalFilters(new Internal_filter_1.InternalServerExceptionFilter());
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Delivery Service Apis')
        .setDescription('Delivery  service Apis description built using swagger OpenApi. You can find out more about Swagger at http://swagger.io')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(config_1.default.port);
    common_1.Logger.log(`Server running on http://localhost:${config_1.default.port}`, 'Bootstrap');
}
bootstrap();
//# sourceMappingURL=main.js.map