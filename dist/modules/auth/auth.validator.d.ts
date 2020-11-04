import { Connection } from 'typeorm';
export declare class AuthAPIValidators {
    private readonly connection;
    private readonly riderProfileRequest;
    constructor(connection: Connection);
    validateRiderProfileRequestExists(mobile_number: any, mobile_number_ext: any): Promise<boolean>;
}
