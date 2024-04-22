import React from "react";
import "./FunctionHallList.css";
import { useStoreActions, useStoreState } from "../../../store/hooks";
import IndividualFunctionHall from "./IndividualFunctionHall";
import TailwindButton from "../../../components/TailwindButton";
import AddOrUpdateFunctionHallModal from "../../../components/modals/AddOrUpdateFunctionHallModal";
import FunctionHall from "../../../types/FunctionHall/FunctionHall";
import {
  addFunctionHall,
  updateFunctionHall,
} from "../../../adapters/FunctionHallAdapter";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface FunctionHallListProps {}

const FunctionHallList: React.FC<FunctionHallListProps> = () => {
  // Objects
  const { functionHalls } = useStoreState((state) => state.functionHallStore);
  const { fetchFunctionHalls } = useStoreActions(
    (actions) => actions.functionHallStore,
  );
  // Variables

  // State Variables - Hooks
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = React.useState(false);
  const [editFunctionHall, setEditFunctionHall] = React.useState<
    FunctionHall | undefined
  >();

  // Functions
  const closeModal = () => {
    setOpen(false);
    setEditFunctionHall(undefined);
  };
  const addOrUpdateFunctionHall = (functionHall: FunctionHall) => {
    if (!functionHall._id) {
      addFunctionHall(functionHall).then((res) => {
        //console.log(res);
        fetchFunctionHalls();
        closeModal();
      });
    } else {
      updateFunctionHall(functionHall).then((res) => {
        //console.log(res);
        fetchFunctionHalls();
        closeModal();
      });
    }
  };

  // Hook Functions

  return (
    <div
      className={cn(
        "h-full w-full md:h-full md:w-full overflow-y-hidden md:overflow-y-auto overflow-x-hidden p-[16px] relative md:block",
      )}
    >
      <div className="flex flex-row px-[24px] pb-[24px] pt-[8px] justify-center items-center md:relative">
        <div className="flex font-airbnb font-black text-center text-[24px] ">
          Manage Function Halls
        </div>
        {
          <div
            className={cn(
              !isDesktop
                ? "absolute bottom-0 w-full left-auto p-[8px]"
                : "absolute right-0 top-auto",
            )}
          >
            <Button
              size={isDesktop ? "default" : "lg"}
              className="w-full"
              onClick={() => {
                setOpen(true);
              }}
            >
              Add
            </Button>
          </div>
        }
      </div>
      <div
        className={cn(
          "flex flex-col p-[8px] gap-[10px] overflow-y-auto",
          isDesktop ? "" : "h-[calc(100%-140px)]",
        )}
      >
        {functionHalls.map((functionHall, i) => (
          <div
            className={
              i === functionHalls.length - 1 && !isDesktop ? "mb-[20px]" : ""
            }
          >
            <IndividualFunctionHall
              functionHall={functionHall}
              onClick={() => {
                setEditFunctionHall(functionHall);
              }}
              isManage
            />
          </div>
        ))}
      </div>
      <AddOrUpdateFunctionHallModal
        open={open || !!editFunctionHall}
        closeCallback={() => {
          closeModal();
        }}
        cta={addOrUpdateFunctionHall}
        editFunctionHall={editFunctionHall}
      />
    </div>
  );
};

export default FunctionHallList;
