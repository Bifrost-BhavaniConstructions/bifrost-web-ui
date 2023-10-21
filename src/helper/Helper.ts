import ServerErrorMessage from "../types/ServerErrorMessage";
import Enquiry, { EnquiryCreateWrapper } from "../types/FunctionHall/Enquiry";

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
