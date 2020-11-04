import { JwtPayload } from '../../common/constants/jwtPayload.interface';
import { Customer } from './entities/Customer.entity';
import { BaseJwtStrategy } from '../../common/jwt/baseJwtStrategy';
export declare class CustomerJwtStrategy extends BaseJwtStrategy {
    validate(payload: JwtPayload): Promise<Customer>;
}
