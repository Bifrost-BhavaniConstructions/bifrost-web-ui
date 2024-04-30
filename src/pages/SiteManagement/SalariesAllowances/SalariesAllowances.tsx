import React from "react";
import "./SalariesAllowances.css";
import ChakraSelect from "../../../components/ChakraSelect";
import { UserRoleEnum } from "../../../enums/UserRoleEnum";
import TailwindButton from "../../../components/TailwindButton";
import { useStoreState } from "../../../store/hooks";
import { User } from "../../../types/User";
import TabSelect from "../../../components/TabSelect";
import { getSalaryOfUser } from "../../../helper/Helper";
import AddAdvanceDeductionModal from "../../../components/modals/AddAdvanceDeductionModal";
import {
  getAttendanceTransactions,
  getPayoutLastMonth,
} from "../../../adapters/SiteManagementAdapter";
import PaySalaryModal from "../../../components/modals/PaySalaryModal";
import PayVariableModal from "../../../components/modals/PayVariableModal";
import { AttendanceTransaction } from "../../../types/SiteManagement/AttendanceTransaction";
import IndividualAttendanceTransaction from "../Attendance/IndividualAttendanceTransaction";
import { SalaryTransactionTypeEnum } from "../../../enums/SalaryTransactionTypeEnum";
import { Button } from "@/components/ui/button";

interface SalariesAllowancesProps {}

const SalariesAllowances: React.FC<SalariesAllowancesProps> = () => {
  // Objects

  // Variables

  // State Variables - Hooks
  const { siteUsers } = useStoreState((state) => state.peopleStore);
  const [open, setOpen] = React.useState<boolean>(false);
  const [openSalary, setOpenSalary] = React.useState<boolean>(false);
  const [openVariable, setOpenVariable] = React.useState<boolean>(false);
  const [selectedTab, setSelectedTab] = React.useState<number>(0);
  const [selectedUser, setSelectedUser] = React.useState<User | undefined>(
    undefined,
  );

  const [variableLastMonth, setVariableLastMonth] = React.useState(0);
  const [transaction, setTransactions] = React.useState<
    AttendanceTransaction[]
  >([]);

  // Functions

  // Hook Functions
  React.useEffect(() => {
    setVariableLastMonth(0);
    setTransactions([]);
  }, [selectedUser]);
  React.useEffect(() => {
    if (selectedUser) {
      if (
        [UserRoleEnum.VENDOR, UserRoleEnum.DRIVER].includes(selectedUser.role)
      ) {
        getPayoutLastMonth(selectedUser._id!).then((res) =>
          setVariableLastMonth(res),
        );
      } else {
        setVariableLastMonth(0);
      }
      getAttendanceTransactions(selectedUser._id!).then((res) =>
        setTransactions(res),
      );
    }
  }, [selectedUser]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-row px-[24px] py-[16px] justify-between">
        <div className="flex font-airbnb font-black text-[24px]">Salaries</div>
        <div>
          <ChakraSelect
            name=""
            placeholder={"select user"}
            value={selectedUser?._id!}
            values={siteUsers
              .filter((fH) => fH.role !== UserRoleEnum.SUPER_ADMIN)
              .map((fH) => ({
                name: fH.name,
                value: fH._id!,
              }))}
            onValueChange={(value) => {
              setSelectedUser(siteUsers.filter((f) => f._id === value)[0]);
            }}
          />
        </div>
      </div>
      {selectedUser && (
        <div className="flex flex-row px-[16px] justify-center items-center">
          <TabSelect
            options={[
              {
                text: "Fixed Salary",
              },
              {
                text: "Variable Pay",
              },
            ]}
            tabIndex={selectedTab}
            setTabIndex={setSelectedTab}
          />
        </div>
      )}
      {selectedTab === 0 && selectedUser && (
        <div className="flex flex-row px-[24px] justify-between">
          <div className="flex flex-1 flex-col">
            <div className="font-light text-[12px] opacity-70">
              fixed salary
            </div>
            <div className="flex font-airbnb font-black text-[24px]">
              ₹{getSalaryOfUser(selectedUser)}
            </div>
          </div>
          <div className="flex items-end">
            <Button
              onClick={() => {
                setOpen(true);
              }}
            >
              Advance/Deduction +
            </Button>
          </div>
        </div>
      )}
      {selectedTab === 1 && selectedUser && (
        <div className="flex flex-row px-[24px] justify-between">
          <div className="flex flex-1 flex-col">
            <div className="font-light text-[12px] opacity-70">
              variable salary (this month)
            </div>
            <div className="flex font-airbnb font-black text-[24px]">
              ₹{variableLastMonth}
            </div>
          </div>
          <div className="flex items-end">
            <Button
              onClick={() => {
                setOpen(true);
              }}
            >
              Advance/Deduction +
            </Button>
          </div>
        </div>
      )}
      {selectedUser && open && (
        <AddAdvanceDeductionModal
          closeCallback={() => {
            setOpen(false);
            if (
              [UserRoleEnum.VENDOR, UserRoleEnum.DRIVER].includes(
                selectedUser.role,
              )
            ) {
              getPayoutLastMonth(selectedUser._id!).then((res) =>
                setVariableLastMonth(res),
              );
            } else {
              setVariableLastMonth(0);
            }
            getAttendanceTransactions(selectedUser._id!).then((res) =>
              setTransactions(res),
            );
          }}
          open={open}
          userId={selectedUser._id!}
          isSalary={selectedTab === 0}
        />
      )}
      {selectedUser && <div className="flex px-[24px] mt-[10px]">Passbook</div>}
      <div className="flex flex-col h-[calc(100%-10px)] px-[18px] overflow-y-auto overflow-x-hidden">
        {transaction
          .filter((t) =>
            selectedTab === 0
              ? [
                  SalaryTransactionTypeEnum.SALARY,
                  SalaryTransactionTypeEnum.SALARY_DEDUCTION,
                  SalaryTransactionTypeEnum.SALARY_ADVANCE,
                ].includes(t.transactionType)
              : [
                  SalaryTransactionTypeEnum.ALLOWANCE,
                  SalaryTransactionTypeEnum.ALLOWANCE_DEDUCTION,
                  SalaryTransactionTypeEnum.ALLOWANCE_ADVANCE,
                ].includes(t.transactionType),
          )
          .map((tr) => {
            return <IndividualAttendanceTransaction transaction={tr} />;
          })}
      </div>
      {selectedUser && selectedTab === 0 && (
        <div className="flex w-full p-[8px]">
          <Button
            className="justify-center w-full h-full"
            onClick={() => {
              setOpenSalary(true);
            }}
          >
            Pay Salary
          </Button>
          <PaySalaryModal
            closeCallback={() => {
              setOpenSalary(false);
              getPayoutLastMonth(selectedUser._id!).then((res) =>
                setVariableLastMonth(res),
              );
              getAttendanceTransactions(selectedUser._id!).then((res) =>
                setTransactions(res),
              );
            }}
            open={openSalary}
            userId={selectedUser._id!}
            salary={getSalaryOfUser(selectedUser)!}
          />
        </div>
      )}
      {selectedUser && selectedTab === 1 && (
        <div className="flex w-full p-[8px]">
          <Button
            className="justify-center w-full h-full"
            onClick={() => {
              setOpenVariable(true);
            }}
          >
            Pay Variable Pay
          </Button>
          <PayVariableModal
            closeCallback={() => {
              setOpenVariable(false);
              getPayoutLastMonth(selectedUser._id!).then((res) =>
                setVariableLastMonth(res),
              );
              getAttendanceTransactions(selectedUser._id!).then((res) =>
                setTransactions(res),
              );
            }}
            open={openVariable}
            userId={selectedUser._id!}
            variable={variableLastMonth}
          />
        </div>
      )}
    </div>
  );
};

export default SalariesAllowances;
