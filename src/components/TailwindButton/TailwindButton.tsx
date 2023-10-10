import React from "react";
import "./TailwindButton.css";

interface TailwindButtonProps {
  text: string;
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
      className="flex px-[12px] py-[6px] rounded-[3px] text-[14px] font-airbnb font-normal bg-low-bg"
    >
      {text}
    </div>
  );
};

export default TailwindButton;
