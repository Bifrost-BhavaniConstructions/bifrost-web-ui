export enum ModeOfPaymentEnum {
  CASH = "CASH",
  UPI = "UPI",
  RTGS_NEFT = "RTGS_NEFT",
  OTHERS = "OTHERS",
}

export const getModeOfPaymentFromString = (
  typeString: string,
): ModeOfPaymentEnum | undefined => {
  switch (typeString) {
    case ModeOfPaymentEnum.CASH:
    case ModeOfPaymentEnum.UPI:
    case ModeOfPaymentEnum.RTGS_NEFT:
    case ModeOfPaymentEnum.OTHERS:
      return typeString as ModeOfPaymentEnum;
    default:
      return undefined; // Return undefined for an invalid string
  }
};
