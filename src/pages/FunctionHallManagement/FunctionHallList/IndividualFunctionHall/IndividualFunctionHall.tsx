import React from "react";
import "./IndividualFunctionHall.css";
import FunctionHall from "../../../../types/FunctionHall/FunctionHall";

interface IndividualFunctionHallProps {
  functionHall: FunctionHall;
  onClick: Function;
}

const IndividualFunctionHall: React.FC<IndividualFunctionHallProps> = ({
  functionHall,
  onClick,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <div
      className="flex w-full flex-col p-[16px] bg-low-bg rounded-[12px] mb-[16px]"
      onClick={() => {
        onClick();
      }}
    >
      <div className="flex font-normal text-[18px]">{functionHall.name}</div>
      <div className="flex font-light text-[14px]">{functionHall.address}</div>
    </div>
  );
};

export default IndividualFunctionHall;
