import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { OtpBasedRegistrationDto } from '../../common/dtos/otpBasedRegistrationDto';
import { Rider } from './entities/Rider.entity';
import { RiderService } from './rider.service';


@ApiTags('Rider')
@Crud({
  model: {
    type: Rider

  },
  dto: {
    create: OtpBasedRegistrationDto
  },
  routes : {
    only: ['createOneBase', ]
  }


})
@Controller('rider')
export class RiderController {
  constructor(private readonly service: RiderService) {}
}
