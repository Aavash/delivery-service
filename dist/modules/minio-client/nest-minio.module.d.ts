import { DynamicModule } from '@nestjs/common';
import { NestMinioOptions, NestMinioAsyncOptions } from './interfaces';
export declare class NestMinioModule {
    static register(options: NestMinioOptions): DynamicModule;
    static registerAsync(options: NestMinioAsyncOptions): DynamicModule;
    private static createProviders;
    private static createOptionsProvider;
}
