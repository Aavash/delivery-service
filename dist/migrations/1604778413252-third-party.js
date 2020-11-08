"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thirdParty1604778413252 = void 0;
class thirdParty1604778413252 {
    constructor() {
        this.name = 'thirdParty1604778413252';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "customer" ADD "google_id" character varying(150)`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "fb_id" character varying(150)`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "apple_id" character varying(150)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "apple_id"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "fb_id"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "google_id"`);
    }
}
exports.thirdParty1604778413252 = thirdParty1604778413252;
//# sourceMappingURL=1604778413252-third-party.js.map