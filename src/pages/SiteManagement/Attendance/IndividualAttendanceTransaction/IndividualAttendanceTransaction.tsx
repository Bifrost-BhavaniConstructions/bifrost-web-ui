import React from "react";
import "./IndividualAttendanceTransaction.css";
import { useStoreState } from "../../../../store/hooks";
import { AttendanceTransaction } from "../../../../types/SiteManagement/AttendanceTransaction";
import { SalaryTransactionTypeEnum } from "../../../../enums/SalaryTransactionTypeEnum";

interface IndividualTransactionProps {
  transaction: AttendanceTransaction;
  light?: boolean;
  minimal?: boolean;
}

const IndividualAttendanceTransaction: React.FC<IndividualTransactionProps> = ({
  transaction,
  light = true,
  minimal = false,
}) => {
  // Objects

  // Variables
  const isSalaryAdvance = [
    SalaryTransactionTypeEnum.SALARY,
    SalaryTransactionTypeEnum.ALLOWANCE,
  ].includes(transaction.transactionType);

  // State Variables - Hooks
  const { user } = useStoreState((state) => state.userStore);
  // Functions
  const getTransactionTypeLabel = (
    transactionType: SalaryTransactionTypeEnum,
  ) => {
    switch (transactionType) {
      case SalaryTransactionTypeEnum.ALLOWANCE:
        return "Variable Amount Paid";
      case SalaryTransactionTypeEnum.SALARY:
        return "Salary Paid";
      case SalaryTransactionTypeEnum.ALLOWANCE_ADVANCE:
        return "Advance";
      case SalaryTransactionTypeEnum.SALARY_ADVANCE:
        return "Advance";
      case SalaryTransactionTypeEnum.ALLOWANCE_DEDUCTION:
        return "Deduction";
      case SalaryTransactionTypeEnum.SALARY_DEDUCTION:
        return "Deduction";
    }
  };

  function convertMMYYYYToMMMYYYY(dateString: string) {
    // Assuming dateString is in the format "MMYYYY"
    const month = dateString.slice(0, 2);
    const year = dateString.slice(2);

    // Create a Date object using the year and month
    const parsedDate = new Date(`${year}-${month}-01`);

    // Format the date to "MMM/YYYY" using Intl.DateTimeFormat
    return new Intl.DateTimeFormat("en-gb", {
      year: "numeric",
      month: "short",
    }).format(parsedDate);
  }

  // Hook Functions

  return (
    <div className="flex p-[10px] flex-col">
      <div
        className={`flex w-full flex-col rounded-xl border bg-card text-card-foreground shadow`}
      >
        <div className="flex p-[12px]">
          <div className="flex flex-1 flex-col items-start justify-center">
            <div className="flex font-medium text-[14px]">
              {getTransactionTypeLabel(transaction.transactionType)}
            </div>
            <div className="flex flex-1 flex-col">
              <div className="font-light text-[12px] opacity-70">
                {isSalaryAdvance ? "period" : "on"}
              </div>
              <div className="font-medium text-[14px]">
                {isSalaryAdvance
                  ? transaction.transactionType ===
                    SalaryTransactionTypeEnum.SALARY
                    ? convertMMYYYYToMMMYYYY(transaction.salaryMonthYear)
                    : `${new Date(transaction.variableFrom).toLocaleDateString(
                        "en-gb",
                      )} - ${new Date(
                        transaction.variableTo,
                      ).toLocaleDateString("en-gb")}`
                  : new Date(transaction.createdAt).toLocaleDateString("en-gb")}
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center ">
            <div className="font-medium text-[14px] text-muted-foreground">
              ₹{transaction.amount ? transaction.amount : "0"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualAttendanceTransaction;
