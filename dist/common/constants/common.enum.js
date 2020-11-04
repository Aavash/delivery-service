"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTypeEnum = exports.VerificationType = exports.VerificationStatusEnum = exports.GenderEnum = exports.RatingEnum = exports.DeliveryStatusEnum = exports.ObjectSensitivityEnum = exports.ApprovalStatusEnum = void 0;
var ApprovalStatusEnum;
(function (ApprovalStatusEnum) {
    ApprovalStatusEnum["PENDING"] = "PENDING";
    ApprovalStatusEnum["APPROVED"] = "APPROVED";
    ApprovalStatusEnum["REJECTED"] = "REJECTED";
})(ApprovalStatusEnum = exports.ApprovalStatusEnum || (exports.ApprovalStatusEnum = {}));
var ObjectSensitivityEnum;
(function (ObjectSensitivityEnum) {
    ObjectSensitivityEnum["FRAGILE"] = "FRAGILE";
    ObjectSensitivityEnum["NORMAL"] = "NORMAL";
})(ObjectSensitivityEnum = exports.ObjectSensitivityEnum || (exports.ObjectSensitivityEnum = {}));
var DeliveryStatusEnum;
(function (DeliveryStatusEnum) {
    DeliveryStatusEnum["PENDING_ASSIGNMENT"] = "PENDING_ASSIGNMENT";
    DeliveryStatusEnum["IN_PROGRESS"] = "IN_PROGRESS";
    DeliveryStatusEnum["COMPLETED"] = "COMPLETED";
})(DeliveryStatusEnum = exports.DeliveryStatusEnum || (exports.DeliveryStatusEnum = {}));
var RatingEnum;
(function (RatingEnum) {
    RatingEnum[RatingEnum["ONE"] = 1] = "ONE";
    RatingEnum[RatingEnum["TWO"] = 2] = "TWO";
    RatingEnum[RatingEnum["THREE"] = 3] = "THREE";
    RatingEnum[RatingEnum["FOUR"] = 4] = "FOUR";
    RatingEnum[RatingEnum["FIVE"] = 5] = "FIVE";
})(RatingEnum = exports.RatingEnum || (exports.RatingEnum = {}));
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["MALE"] = "MALE";
    GenderEnum["FEMALE"] = "FEMALE";
    GenderEnum["OTHERS"] = "OTHERS";
})(GenderEnum = exports.GenderEnum || (exports.GenderEnum = {}));
var VerificationStatusEnum;
(function (VerificationStatusEnum) {
    VerificationStatusEnum["UNCLAIMED"] = "UNCLAIMED";
    VerificationStatusEnum["ACTIVE"] = "ACTIVE";
    VerificationStatusEnum["EXPIRED"] = "EXPIRED";
})(VerificationStatusEnum = exports.VerificationStatusEnum || (exports.VerificationStatusEnum = {}));
var VerificationType;
(function (VerificationType) {
    VerificationType["LOGIN"] = "LOGIN";
    VerificationType["SET_PASSWORD"] = "SET_PASSWORD";
    VerificationType["RESET_PASSWORD"] = "RESET_PASSWORD";
})(VerificationType = exports.VerificationType || (exports.VerificationType = {}));
var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum["CUSTOMER"] = "CUSTOMER";
    UserTypeEnum["RIDER"] = "RIDER";
})(UserTypeEnum = exports.UserTypeEnum || (exports.UserTypeEnum = {}));
//# sourceMappingURL=common.enum.js.map