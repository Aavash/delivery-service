import { BaseEntity } from 'typeorm';
export declare class CustomBaseEntity extends BaseEntity {
    id: number;
    idx: string;
    is_obsolete: boolean;
    created_on: Date;
    modified_on: Date | null;
}
