import React, { useRef } from "react";
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
}

const LabelledInput: React.FC<LabelledInputProps> = ({
  setValue,
  value,
  name,
  inputProps,
  inputLeftAddon,
  inputRightAddon,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <div>
      <div className="font-light text-[12px] opacity-70">{name}</div>
      <InputGroup>
        {inputLeftAddon && <InputLeftAddon children={inputLeftAddon} />}
        <Input
          value={inputProps?.type === "number" && value === 0 ? "" : value}
          onChange={(e) => setValue(e.target.value)}
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
