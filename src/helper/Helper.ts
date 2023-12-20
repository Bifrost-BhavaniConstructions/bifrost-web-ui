import ServerErrorMessage from "../types/ServerErrorMessage";
import Enquiry, { EnquiryCreateWrapper } from "../types/FunctionHall/Enquiry";
import { User } from "../types/User";
import { UserRoleEnum } from "../enums/UserRoleEnum";

export const parseServerError: (errorString: string) => ServerErrorMessage = (
  errorString: string,
) => {
  return JSON.parse(errorString);
};

export const EnquiryToEnquiryCreateWrapper: (
  enquiry: Enquiry,
) => EnquiryCreateWrapper = (enquiry: Enquiry) => {
  const e = enquiry;
  return {
    ...enquiry,
    functionHall: e.functionHall._id!,
    enquiryType: e.enquiryType._id!,
  };
};

export const getSalaryOfUser = (user: User) => {
  switch (user.role) {
    case UserRoleEnum.SUPERVISOR:
      return user.supervisorData?.salary;
    case UserRoleEnum.DRIVER:
      return user.driverData?.salary;
    default:
      return 0;
  }
};
