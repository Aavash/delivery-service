import { JwtPayload } from '../../common/constants/jwtPayload.interface';
import { BaseJwtStrategy } from '../../common/jwt/baseJwtStrategy';
import { Rider } from './entities/Rider.entity';
export declare class CustomerJwtStrategy extends BaseJwtStrategy {
    validate(payload: JwtPayload): Promise<Rider>;
}
