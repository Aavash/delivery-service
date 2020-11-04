"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NestMinioModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestMinioModule = void 0;
const common_1 = require("@nestjs/common");
const nest_minio_service_1 = require("./nest-minio.service");
const constants_1 = require("./constants");
const nest_minio_providers_1 = require("./nest-minio.providers");
const nest_minio_connection_provider_1 = require("./nest-minio-connection.provider");
let NestMinioModule = NestMinioModule_1 = class NestMinioModule {
    static register(options) {
        return {
            module: NestMinioModule_1,
            providers: nest_minio_providers_1.createNestMinioProviders(options),
        };
    }
    static registerAsync(options) {
        return {
            module: NestMinioModule_1,
            providers: [...this.createProviders(options)],
            imports: options.imports || [],
        };
    }
    static createProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createOptionsProvider(options)];
        }
        return [
            this.createOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }
    static createOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: constants_1.NEST_MINIO_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: constants_1.NEST_MINIO_OPTIONS,
            useFactory: async (optionsFactory) => await optionsFactory.createNestMinioOptions(),
            inject: [options.useExisting || options.useClass],
        };
    }
};
NestMinioModule = NestMinioModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({
        providers: [nest_minio_service_1.NestMinioService, nest_minio_connection_provider_1.connectionFactory],
        exports: [nest_minio_service_1.NestMinioService, nest_minio_connection_provider_1.connectionFactory],
    })
], NestMinioModule);
exports.NestMinioModule = NestMinioModule;
//# sourceMappingURL=nest-minio.module.js.map