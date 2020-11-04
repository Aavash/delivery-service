import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { RiderProfileRequest } from '../entities/RiderProfileRequest.entity';
import { ApiTags } from '@nestjs/swagger';
import { ProfileRequestService } from '../services/profileRequest.service';

@ApiTags('Rider')
@Crud({
  model: {
    type: RiderProfileRequest
  },
  routes : {
    only: ['getManyBase', ]
  },
  query: {
    maxLimit: 100,
    alwaysPaginate: true
  }
})
@Controller('rider/profile-requests')
export class ProfileRequestController implements CrudController<RiderProfileRequest> {
  constructor(public service: ProfileRequestService) {}
}
