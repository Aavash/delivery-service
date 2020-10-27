import { BaseEntity, Column, CreateDateColumn, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export class CustomBaseEntity extends BaseEntity{

  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Generated('uuid')
  idx: string;

  @Exclude({ toPlainOnly: true })
  @Column('boolean', {
  default: () => 'false',
  name: 'is_obsolete',
  })
  is_obsolete: boolean;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  modified_on: Date | null;
}