import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../../common/constants/jwtPayload.interface';
import { getConnection } from 'typeorm';
import { Customer } from './entities/Customer.entity';

@Injectable()
export class CustomerJwtStrategy extends PassportStrategy(Strategy){
  constructor(

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

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