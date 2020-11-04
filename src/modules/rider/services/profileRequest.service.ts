import { RiderProfileRequest } from '../entities/RiderProfileRequest.entity';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileRequestService extends TypeOrmCrudService<RiderProfileRequest> {
  constructor(@InjectRepository(RiderProfileRequest) repo) {
    super(repo);
  }
}
