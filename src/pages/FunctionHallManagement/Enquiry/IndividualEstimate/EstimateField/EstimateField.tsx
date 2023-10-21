import React from "react";
import "./EstimateField.css";

interface EstimateFieldProps {
  title: string;
  tariff: number;
  per?: string;
  isRight: boolean;
  isFullWidth?: boolean;
  fontSize?: number;
}

const EstimateField: React.FC<EstimateFieldProps> = ({
  per,
  tariff,
  title,
  isRight,
  isFullWidth,
  fontSize = 12,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <div
      className={`flex flex-col mt-[4px] ${
        isFullWidth ? "w-full" : "w-[50%]"
      } ${isRight && "items-end"}`}
    >
      <div className={`font-light text-[${fontSize}px] opacity-70`}>
        {title}
      </div>
      <div className={`font-semibold text-[${fontSize}px] opacity-70`}>
        ₹{tariff}
        {per && ` per ${per}`}
      </div>
    </div>
  );
};

export default EstimateField;
