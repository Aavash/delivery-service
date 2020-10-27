import {MigrationInterface, QueryRunner} from "typeorm";

export class init1603831227387 implements MigrationInterface {
    name = 'init1603831227387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rider_profile_request" ("id" SERIAL NOT NULL, "is_obsolete" boolean NOT NULL DEFAULT false, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "modified_on" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying(150) NOT NULL, "middle_name" character varying(150), "last_name" character varying(150) NOT NULL, "password" character varying(150), "is_password_set" boolean NOT NULL DEFAULT false, "email" character varying(150) NOT NULL, "gender" character varying(150), "mobile_number_ext" character varying(150) NOT NULL, "mobile_number" character varying(150) NOT NULL, "date_of_birth" date, "is_active" boolean NOT NULL DEFAULT true, "is_completely_registered" boolean NOT NULL DEFAULT false, "approval_status" character varying NOT NULL, CONSTRAINT "PK_38829a9898c9225d2cabbc3296c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rider" ("id" SERIAL NOT NULL, "is_obsolete" boolean NOT NULL DEFAULT false, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "modified_on" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying(150) NOT NULL, "middle_name" character varying(150), "last_name" character varying(150) NOT NULL, "password" character varying(150), "is_password_set" boolean NOT NULL DEFAULT false, "email" character varying(150) NOT NULL, "gender" character varying(150), "mobile_number_ext" character varying(150) NOT NULL, "mobile_number" character varying(150) NOT NULL, "date_of_birth" date, "is_active" boolean NOT NULL DEFAULT true, "is_completely_registered" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_1ed6540e613592e2a470a162ef1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "package_delivery_location_request" ("id" SERIAL NOT NULL, "is_obsolete" boolean NOT NULL DEFAULT false, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "modified_on" TIMESTAMP NOT NULL DEFAULT now(), "latitude" character varying(150) NOT NULL, "longitude" character varying(150) NOT NULL, "title" character varying(150) NOT NULL, "request_note" character varying(150), "is_confidential" boolean NOT NULL DEFAULT false, "object_sensitivity" character varying NOT NULL, "delivery_status" character varying NOT NULL, "deliveryRequestId" integer, CONSTRAINT "PK_3725d978f7165d9dbb0e574e624" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "delivery_rating_review" ("id" SERIAL NOT NULL, "is_obsolete" boolean NOT NULL DEFAULT false, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "modified_on" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(150) NOT NULL, "RATING" character varying NOT NULL, "deliveryRequestId" integer, CONSTRAINT "PK_55ff61d476726efed8dfea47ab1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "delivery_request" ("id" SERIAL NOT NULL, "is_obsolete" boolean NOT NULL DEFAULT false, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "modified_on" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(150) NOT NULL, "name" character varying(150), "approval_status" character varying NOT NULL, "delivery_status" character varying NOT NULL, "customerId" integer, "assignedToId" integer, CONSTRAINT "PK_bb8d3e184ec947880f4e1103dc0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "is_obsolete" boolean NOT NULL DEFAULT false, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "modified_on" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying(150) NOT NULL, "middle_name" character varying(150), "last_name" character varying(150) NOT NULL, "password" character varying(150), "is_password_set" boolean NOT NULL DEFAULT false, "email" character varying(150) NOT NULL, "gender" character varying(150), "mobile_number_ext" character varying(150) NOT NULL, "mobile_number" character varying(150) NOT NULL, "date_of_birth" date, "is_active" boolean NOT NULL DEFAULT true, "is_completely_registered" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "package_delivery_location_request" ADD CONSTRAINT "FK_451417a73433ca8a7629c856a72" FOREIGN KEY ("deliveryRequestId") REFERENCES "delivery_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_rating_review" ADD CONSTRAINT "FK_9c408337c577529b6e72e74f3bf" FOREIGN KEY ("deliveryRequestId") REFERENCES "delivery_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_request" ADD CONSTRAINT "FK_8726da74a4ec52bfbeb4947890e" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_request" ADD CONSTRAINT "FK_d6ad6f9f317eef68a003b35871a" FOREIGN KEY ("assignedToId") REFERENCES "rider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery_request" DROP CONSTRAINT "FK_d6ad6f9f317eef68a003b35871a"`);
        await queryRunner.query(`ALTER TABLE "delivery_request" DROP CONSTRAINT "FK_8726da74a4ec52bfbeb4947890e"`);
        await queryRunner.query(`ALTER TABLE "delivery_rating_review" DROP CONSTRAINT "FK_9c408337c577529b6e72e74f3bf"`);
        await queryRunner.query(`ALTER TABLE "package_delivery_location_request" DROP CONSTRAINT "FK_451417a73433ca8a7629c856a72"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "delivery_request"`);
        await queryRunner.query(`DROP TABLE "delivery_rating_review"`);
        await queryRunner.query(`DROP TABLE "package_delivery_location_request"`);
        await queryRunner.query(`DROP TABLE "rider"`);
        await queryRunner.query(`DROP TABLE "rider_profile_request"`);
    }

}
