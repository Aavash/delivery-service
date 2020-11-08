import { MigrationInterface, QueryRunner } from 'typeorm';

export class thirdParty1604778413252 implements MigrationInterface {
    name = 'thirdParty1604778413252';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ADD "google_id" character varying(150)`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "fb_id" character varying(150)`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "apple_id" character varying(150)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "apple_id"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "fb_id"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "google_id"`);
    }

}
