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

interface FunctionHallListProps {}

const FunctionHallList: React.FC<FunctionHallListProps> = () => {
  // Objects
  const { functionHalls } = useStoreState((state) => state.functionHallStore);
  const { fetchFunctionHalls } = useStoreActions(
    (actions) => actions.functionHallStore,
  );
  // Variables

  // State Variables - Hooks
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
        console.log(res);
        fetchFunctionHalls();
        closeModal();
      });
    } else {
      updateFunctionHall(functionHall).then((res) => {
        console.log(res);
        fetchFunctionHalls();
        closeModal();
      });
    }
  };

  // Hook Functions

  return (
    <div className="h-[calc(100%-90px)] overflow-y-auto overflow-x-hidden">
      <div className="flex flex-row px-[24px] py-[16px] justify-between">
        <div className="flex font-airbnb font-black text-[24px]">
          Function Halls
        </div>
        <TailwindButton
          onClick={() => {
            setOpen(true);
          }}
          text="Add +"
        />
      </div>
      <div className="flex flex-col p-[8px]">
        {functionHalls.map((functionHall) => (
          <IndividualFunctionHall
            functionHall={functionHall}
            onClick={() => {
              setEditFunctionHall(functionHall);
            }}
          />
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
