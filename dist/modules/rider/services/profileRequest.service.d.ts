import { RiderProfileRequest } from '../entities/RiderProfileRequest.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
export declare class ProfileRequestService extends TypeOrmCrudService<RiderProfileRequest> {
    constructor(repo: any);
}
