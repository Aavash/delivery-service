import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../../common/constants/jwtPayload.interface';
import { getConnection } from 'typeorm';
import { Customer } from './entities/Customer.entity';
import { BaseJwtStrategy } from '../../common/jwt/baseJwtStrategy';

@Injectable()
export class CustomerJwtStrategy extends BaseJwtStrategy{

  async validate(payload: JwtPayload): Promise<Customer> {
    const { idx } = payload;
    const employerRepository = await getConnection().getRepository(Customer);
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