"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const Internal_filter_1 = require("./common/filters/Internal.filter");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const core_1 = require("@nestjs/core");
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