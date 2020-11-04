import { CrudController } from '@nestjsx/crud';
import { RiderProfileRequest } from '../entities/RiderProfileRequest.entity';
import { ProfileRequestService } from '../services/profileRequest.service';
export declare class ProfileRequestController implements CrudController<RiderProfileRequest> {
    service: ProfileRequestService;
    constructor(service: ProfileRequestService);
}
