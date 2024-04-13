import React from "react";
import "./ChakraSelect.css";
import { InputGroup, Select } from "@chakra-ui/react";

interface ChakraSelectProps {
  name: string;
  value: string;
  values: { name: string; value: string }[];
  onValueChange: (value: string) => void;
  required?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
}

const ChakraSelect: React.FC<ChakraSelectProps> = ({
  name,
  value,
  values,
  onValueChange,
  required = false,
  isDisabled = false,
  fullWidth = false,
  placeholder = "Select option",
}) => {
  // Objects

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <div
      className={`flex flex-col ${
        fullWidth ? "flex-grow" : "flex-grow-0"
      } w-full`}
    >
      {name !== "" && (
        <div className="font-light text-[12px] opacity-70 mt-[4px] w-full">
          {name}
          {required && (
            <span className="text-red-500 ml-[3px] text-[14px]">*</span>
          )}
        </div>
      )}
      <InputGroup>
        <Select
          value={value}
          variant="filled"
          placeholder={placeholder}
          onChange={(e) => {
            onValueChange(e.target.value);
          }}
          isDisabled={isDisabled}
          className="w-full"
        >
          {values.map((value) => {
            return <option value={value.value}>{value.name}</option>;
          })}
        </Select>
      </InputGroup>
    </div>
  );
};

export default ChakraSelect;
