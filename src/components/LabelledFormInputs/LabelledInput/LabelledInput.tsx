import React from "react";
import "./LabelledInput.css";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputProps,
  InputRightAddon,
} from "@chakra-ui/react";

interface LabelledInputProps {
  name: string;
  value: string | number;
  setValue: Function;
  inputProps?: InputProps;
  inputLeftAddon?: string;
  inputRightAddon?: string;
  required?: boolean;
  fullWidth?: boolean;
}

const LabelledInput: React.FC<LabelledInputProps> = ({
  setValue,
  value,
  name,
  inputProps,
  inputLeftAddon,
  inputRightAddon,
  required = false,
  fullWidth = false,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <div className={`flex flex-col ${fullWidth ? "flex-grow" : "flex-grow-0"}`}>
      <div className="font-light text-[12px] mt-[4px] opacity-70">
        {name}
        {required && (
          <span className="text-red-500 ml-[3px] text-[14px]">*</span>
        )}
      </div>
      <InputGroup>
        {inputLeftAddon && <InputLeftAddon children={inputLeftAddon} />}
        <Input
          value={inputProps?.type === "number" && value === 0 ? "" : value}
          onChange={(e) => setValue(e.target.value)}
          onWheel={(e) => (e.target as HTMLElement).blur()}
          variant="filled"
          placeholder={inputProps?.isDisabled ? "" : "Enter " + name}
          {...inputProps}
        />
        {inputRightAddon && <InputRightAddon children={inputRightAddon} />}
      </InputGroup>
    </div>
  );
};

export default LabelledInput;
