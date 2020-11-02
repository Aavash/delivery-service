import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../../common/constants/jwtPayload.interface';
import { getConnection } from 'typeorm';
import { BaseJwtStrategy } from '../../common/jwt/baseJwtStrategy';
import { Rider } from './entities/Rider.entity';

@Injectable()
export class CustomerJwtStrategy extends BaseJwtStrategy{

  async validate(payload: JwtPayload): Promise<Rider> {
    const { idx } = payload;
    const employerRepository = await getConnection().getRepository(Rider);
    const user = await employerRepository.findOne({ where: { idx: idx } });

    if (!user) {
      throw new UnauthorizedException()
    }
    // else if (!user.is_superadmin){
    //   throw new UnauthorizedException()
    // }

    return user
  }
}