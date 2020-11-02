import { Injectable } from '@nestjs/common';
import { Customer } from '../entities/Customer.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { DeepPartial, Repository } from 'typeorm';


@Injectable()
export class CustomerService extends TypeOrmCrudService<Customer> {
  constructor(@InjectRepository(Customer) repo ) {
    super(repo);
  }

  async createOne(req: CrudRequest, dto: DeepPartial<Customer>): Promise<Customer> {
    // Customer.create(...dto);
    return await super.createOne(req, dto);
  }
}