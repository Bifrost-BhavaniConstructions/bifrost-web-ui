import React from "react";
import "./PaySalaryModal.css";
import {
  getAllowanceDataByMonth,
  paySalaryForMonth,
} from "../../../adapters/SiteManagementAdapter";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import ChakraModal from "../ChakraModal";
import moment from "moment/moment";

interface PaySalaryModalProps {
  closeCallback: Function;
  open: boolean;
  userId: string;
  salary: number;
}

const PaySalaryModal: React.FC<PaySalaryModalProps> = ({
  open,
  userId,
  closeCallback,
  salary,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks
  const [month, setMonth] = React.useState<string>("");
  const [advance, setAdvance] = React.useState<number>(0);
  const [alreadyExists, setAlreadyExists] = React.useState<boolean>(false);

  // Functions

  // Hook Functions
  React.useEffect(() => {
    if (month !== "") {
      getAllowanceDataByMonth(
        userId,
        `${month.split("-")[1]}${month.split("-")[0]}`,
      )
        .then((res) => {
          setAlreadyExists(false);
          setAdvance(res);
        })
        .catch((e) => {
          if (e.toString().includes("409")) {
            setAlreadyExists(true);
          }
        });
    }
  }, [month]);

  return (
    <ChakraModal
      closeCallback={() => {
        setMonth("");
        closeCallback();
      }}
      open={open}
      title={"Pay Salary"}
      action={async () => {
        await paySalaryForMonth(
          userId,
          `${month.split("-")[1]}${month.split("-")[0]}`,
          salary - advance,
        );
        setMonth("");
        closeCallback();
      }}
      actionText={"Submit"}
      isButtonDisabled={false}
    >
      <LabelledInput
        required
        name="salary month"
        value={moment(month).format("yyyy-MM")}
        setValue={(_val: string) => {
          setMonth(_val);
        }}
        inputProps={{ type: "month" }}
      />
      {alreadyExists ? (
        <>
          <div className="flex font-airbnb font-black text-[18px] mt-[18px] flex-grow items-center justify-center">
            salary already paid
          </div>
        </>
      ) : (
        <>
          <div className="font-light text-[12px] opacity-70">salary</div>
          <div className="flex font-airbnb font-black text-[24px]">
            ₹{salary}
          </div>
          <div className="font-light text-[12px] opacity-70">arrears</div>
          <div className="flex font-airbnb font-black text-[24px]">
            {advance > 0 && "-"}₹{advance}
          </div>
          <div className="font-light text-[12px] opacity-70">total</div>
          <div className="flex font-airbnb font-black text-[24px]">
            {salary - advance}
          </div>
        </>
      )}
    </ChakraModal>
  );
};

export default PaySalaryModal;
