import BankData from "./BankData";

interface SecurityGuardSecondaryData {
  name?: string;
  personalMobileNumber?: string;
  bankAccountPersonal?: BankData;
  aadhaar?: string;
  pan?: string;
  nickname?: string;
  dob?: string;
}

export default SecurityGuardSecondaryData;
