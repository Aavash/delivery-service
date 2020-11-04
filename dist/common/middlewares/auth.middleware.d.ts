import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
export declare class AuthMiddleWare implements NestMiddleware {
    use(req: Request, res: Response, next: () => void): Promise<void>;
}
