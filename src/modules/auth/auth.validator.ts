import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { RiderProfileRequest } from '../rider/entities/RiderProfileRequest.entity';


@Injectable()
export class AuthAPIValidators{

  private readonly riderProfileRequest: Repository<RiderProfileRequest>;

  constructor(
    private readonly connection: Connection
  ) {
    this.riderProfileRequest = this.connection.getRepository(RiderProfileRequest);
  }

  async validateRiderProfileRequestExists(mobile_number, mobile_number_ext): Promise<boolean> {
    const pendingRiderRequest = await this.riderProfileRequest.findOne({
        where: {
          mobile_number,
          mobile_number_ext,
          is_completely_registered: false
        }
      });

    // if (pendingRiderRequest) {
    //   throw new HttpException('Rider has a pending profile approval.', HttpStatus.BAD_REQUEST)
    // }

    return true
  }


}