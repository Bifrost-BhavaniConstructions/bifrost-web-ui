import React, { ReactNode } from "react";
import "./Radio.css";

interface RadioProps {
  options: {
    text: string | ReactNode;
    onClick: Function;
  }[];
}

const Radio: React.FC<RadioProps> = ({ options }) => {
  // Objects

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <div className="flex w-full p-[8px]">
      <div className="flex flex-wrap justify-center items-center w-full p-[8px]">
        {options.map((option, index) => (
          <div
            key={index}
            className={`flex justify-center p-[2px] w-[50%]`}
            onClick={() => {
              option.onClick();
            }}
          >
            <div className="flex w-full py-[8px] h-full justify-center bg-low-bg rounded-[8px]">
              {option.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Radio;
