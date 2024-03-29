export enum ApprovalStatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum ObjectSensitivityEnum {
  FRAGILE = 'FRAGILE',
  NORMAL = 'NORMAL'
}

export enum DeliveryStatusEnum {
  PENDING_ASSIGNMENT = 'PENDING_ASSIGNMENT',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum RatingEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5
}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHERS = 'OTHERS',
}

export enum VerificationStatusEnum {
  UNCLAIMED = 'UNCLAIMED',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
}

export enum VerificationType {
  LOGIN = 'LOGIN',
  SET_PASSWORD = 'SET_PASSWORD',
  RESET_PASSWORD = 'RESET_PASSWORD'
}

export enum UserTypeEnum {
  CUSTOMER = 'CUSTOMER',
  RIDER = 'RIDER'
}