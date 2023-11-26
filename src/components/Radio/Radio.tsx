import React, { ReactNode } from "react";
import "./Radio.css";

interface RadioProps {
  options: {
    text: string | ReactNode;
    onClick: Function;
  }[];
  isWrapped?: boolean;
  isHighlighted?: boolean;
  noPadding?: boolean;
}

const Radio: React.FC<RadioProps> = ({
  options,
  isWrapped = true,
  isHighlighted = false,
  noPadding = false,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // Functions

  // Hook Functions

  return (
    <div className={`flex w-full ${!noPadding && "p-[8px]"}`}>
      <div
        className={`flex justify-center items-center w-full ${
          !noPadding && "p-[8px]"
        } ${isWrapped && "flex-wrap"}`}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className={`flex justify-center p-[2px] ${
              isWrapped ? "w-[50%]" : "flex-1"
            } ${
              !isHighlighted ? "" : index === selectedIndex ? "" : "opacity-50"
            }`}
            onClick={() => {
              setSelectedIndex(index);
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
