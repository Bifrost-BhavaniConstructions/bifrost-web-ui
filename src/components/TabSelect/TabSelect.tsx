import React from "react";
import "./TabSelect.css";

interface TabSelectProps {
  options: {
    text: string;
  }[];
  tabIndex: number;
  setTabIndex: Function;
}

const TabSelect: React.FC<TabSelectProps> = ({
  options,
  tabIndex,
  setTabIndex,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <div className="flex w-full p-[8px]">
      <div className="flex w-full bg-low-bg rounded-[8px] flex-wrap p-[8px]">
        {options.map((option, index) => (
          <div
            key={option.text}
            className={`flex justify-center py-[8px] rounded-[4px] w-[50%] ${
              tabIndex === index ? "bg-main-bg" : "bg-low-bg"
            }`}
            onClick={() => {
              setTabIndex(index);
            }}
          >
            {option.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabSelect;
