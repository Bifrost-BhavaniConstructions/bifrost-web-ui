import React from "react";
import "./AddAdvanceDeductionModal.css";
import LabelledInput from "../../LabelledFormInputs/LabelledInput";
import { RadioGroup, Stack } from "@chakra-ui/react";
import { Radio as R } from "@chakra-ui/radio";
import ChakraModal from "../ChakraModal";
import { addAllowanceDeduction } from "../../../adapters/SiteManagementAdapter";

interface AddAdvanceDeductionModalProps {
  closeCallback: Function;
  open: boolean;
  userId: string;
  isSalary: boolean;
}

const AddAdvanceDeductionModal: React.FC<AddAdvanceDeductionModalProps> = ({
  closeCallback,
  open,
  userId,
  isSalary,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks
  const [isAdvance, setIsAdvance] = React.useState(true);
  const [amount, setAmount] = React.useState(0);

  // Functions

  // Hook Functions

  return (
    <ChakraModal
      closeCallback={closeCallback}
      open={open}
      title={"Advance/Deduction"}
      action={async () => {
        await addAllowanceDeduction(
          userId,
          isAdvance ? amount : -amount,
          isSalary,
        );
        setAmount(0);
        closeCallback();
      }}
      actionText={"Submit"}
      isButtonDisabled={amount <= 0}
    >
      <>
        <div className="font-light text-[12px] opacity-70">
          advance/deduction
        </div>
        <RadioGroup
          value={isAdvance ? "true" : "false"}
          onChange={(e) => {
            setIsAdvance(e === "true");
          }}
          className="p-[8px] my-[4px]"
          defaultValue="true"
        >
          <Stack spacing={4} direction="row">
            <R value="true">advance</R>
            <R value="false">deduction</R>
          </Stack>
        </RadioGroup>
      </>
      <LabelledInput
        name="number"
        value={amount}
        setValue={(_val: number) => {
          setAmount(_val);
        }}
        inputProps={{ type: "number" }}
      />
    </ChakraModal>
  );
};

export default AddAdvanceDeductionModal;
