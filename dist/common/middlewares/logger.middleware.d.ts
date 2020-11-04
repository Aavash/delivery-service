import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
export declare class LoggerMiddleware implements NestMiddleware {
    private readonly logger;
    use(req: Request, res: Response, next: () => void): void;
}
