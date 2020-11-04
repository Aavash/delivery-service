import { JwtPayload } from '../../common/constants/jwtPayload.interface';
declare const BaseJwtStrategy_base: new (...args: any[]) => any;
export declare class BaseJwtStrategy extends BaseJwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<unknown>;
}
export {};
