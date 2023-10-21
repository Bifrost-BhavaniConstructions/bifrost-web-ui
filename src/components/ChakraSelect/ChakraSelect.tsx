import React from "react";
import "./ChakraSelect.css";
import { InputGroup, Select } from "@chakra-ui/react";

interface ChakraSelectProps {
  name: string;
  value: string;
  values: { name: string; value: string }[];
  onValueChange: (value: string) => void;
}

const ChakraSelect: React.FC<ChakraSelectProps> = ({
  name,
  value,
  values,
  onValueChange,
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
        <Select
          value={value}
          variant="filled"
          placeholder="Select option"
          onChange={(e) => {
            onValueChange(e.target.value);
          }}
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
