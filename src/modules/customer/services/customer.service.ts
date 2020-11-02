import { Injectable } from '@nestjs/common';
import { Customer } from '../entities/Customer.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManyDto, CrudRequest } from '@nestjsx/crud';
import { DeepPartial } from 'typeorm';


@Injectable()
export class CustomerService extends TypeOrmCrudService<Customer> {
  constructor(@InjectRepository(Customer) repo) {
    super(repo);
  }

  createOne(req: CrudRequest, dto: DeepPartial<Customer>): Promise<Customer> {
    // Customer.create(...dto);
    return super.createOne(req, dto);
  }
}