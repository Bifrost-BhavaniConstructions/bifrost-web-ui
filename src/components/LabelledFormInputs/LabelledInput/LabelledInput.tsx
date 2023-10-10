import React from "react";
import "./LabelledInput.css";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputProps,
} from "@chakra-ui/react";

interface LabelledInputProps {
  name: string;
  value: string | number;
  setValue: Function;
  inputProps?: InputProps;
  inputLeftAddon?: string;
}

const LabelledInput: React.FC<LabelledInputProps> = ({
  setValue,
  value,
  name,
  inputProps,
  inputLeftAddon,
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="filled"
          placeholder={"Enter " + name}
          {...inputProps}
        />
      </InputGroup>
    </div>
  );
};

export default LabelledInput;
