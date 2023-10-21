import React from "react";
import "./TailwindButton.css";

interface TailwindButtonProps {
  text: string | React.ReactNode;
  onClick: Function;
}

const TailwindButton: React.FC<TailwindButtonProps> = ({ onClick, text }) => {
  // Objects

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <div
      onClick={() => {
        onClick();
      }}
      className={`flex px-[12px] ${
        text instanceof String ? "py-[6px]" : "py-[12px]"
      } rounded-[3px] text-[14px] font-airbnb font-normal bg-low-bg`}
    >
      {text}
    </div>
  );
};

export default TailwindButton;
