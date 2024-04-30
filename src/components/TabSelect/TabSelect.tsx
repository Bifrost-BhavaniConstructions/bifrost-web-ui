import React, { ReactNode } from "react";
import "./TabSelect.css";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TabSelectProps {
  options: {
    text: ReactNode;
    onClick?: Function;
    index?: number;
  }[];
  tabIndex: number;
  setTabIndex: Function;
  isJustSelector?: Boolean;
  handleClick?: Boolean;
}

const TabSelect: React.FC<TabSelectProps> = ({
  options,
  tabIndex,
  setTabIndex,
  isJustSelector = false,
  handleClick = false,
}) => {
  // Objects

  // Variables

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <Tabs
      defaultValue={"0"}
      value={tabIndex.toString()}
      className={cn(
        "flex min-w-[400px] justify-center items-center",
        isJustSelector || handleClick ? "" : "pb-[24px]",
      )}
      onValueChange={(e) => console.log(e)}
    >
      <TabsList className={isJustSelector ? "gap-[4px]" : ""}>
        {options.map((option, index) => (
          <TabsTrigger
            value={index.toString()}
            onClick={() => {
              console.log(index);
              if (isJustSelector || handleClick) {
                if (option.onClick) {
                  option.onClick();
                }
              } else setTabIndex(index);
            }}
            className={
              isJustSelector && !handleClick
                ? "bg-background text-foreground"
                : ""
            }
          >
            {option.text}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default TabSelect;
