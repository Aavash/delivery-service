import { HttpStatus, Injectable } from '@nestjs/common';
import { Customer } from '../entities/Customer.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManyDto, CrudRequest } from '@nestjsx/crud';
import { DeepPartial, Repository } from 'typeorm';
import { CustomerVerification } from '../entities/CustomerVerification.entity';
import { VerificationStatusEnum, VerificationType } from '../../../common/constants/common.enum';


@Injectable()
export class CustomerService extends TypeOrmCrudService<Customer> {
  constructor(
    @InjectRepository(Customer) repo,

    @InjectRepository(CustomerVerification)
    private verificationRepository: Repository<CustomerVerification>,
  ) {
    super(repo);
  }

  async createOne(req: CrudRequest, dto: DeepPartial<Customer>): Promise<Customer> {
    // Customer.create(...dto);
    const customer = await super.createOne(req, dto);

    const verification = await this.verificationRepository.save({
        customer: customer,
        token: '111111',
        type: VerificationType.SET_PASSWORD,
        status: VerificationStatusEnum.ACTIVE
      });

    console.log(verification);

    return customer
  }
}