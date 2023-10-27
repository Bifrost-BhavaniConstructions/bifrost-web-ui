export enum TransactionTypeEnum {
  ADD_BALANCE = "ADD_BALANCE",
  TRANSFER = "TRANSFER",
  VENDOR_TRANSACTION = "VENDOR_TRANSACTION",
  MISCELLANEOUS_TRANSACTION = "MISCELLANEOUS_TRANSACTION",
  REFUND = "REFUND",
}

export const getTransactionTypeFromString = (
  typeString: string,
): TransactionTypeEnum | undefined => {
  switch (typeString) {
    case TransactionTypeEnum.ADD_BALANCE:
    case TransactionTypeEnum.TRANSFER:
    case TransactionTypeEnum.VENDOR_TRANSACTION:
    case TransactionTypeEnum.MISCELLANEOUS_TRANSACTION:
      return typeString as TransactionTypeEnum;
    default:
      return undefined; // Return undefined for an invalid string
  }
};
