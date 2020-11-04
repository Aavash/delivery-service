import { Customer } from '../entities/Customer.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { Repository } from 'typeorm';
import { OtpLogs } from '../../auth/entities/OtpLogs.entity';
import { OtpBasedRegistrationDto } from '../../../common/dtos/otpBasedRegistrationDto';
export declare class CustomerService extends TypeOrmCrudService<Customer> {
    private otpLogsRepository;
    constructor(repo: any, otpLogsRepository: Repository<OtpLogs>);
    createOne(req: CrudRequest, dto: OtpBasedRegistrationDto): Promise<Customer>;
}
