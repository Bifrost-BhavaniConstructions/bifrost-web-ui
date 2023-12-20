import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useStoreState } from "../../../store/hooks";
import IndividualFunctionHall from "../FunctionHallList/IndividualFunctionHall";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  // Objects
  const navigate = useNavigate();

  // Variables

  const { functionHalls } = useStoreState((state) => state.functionHallStore);

  // State Variables - Hooks

  // Functions

  // Hook Functions

  return (
    <div className="flex h-[calc(100%-88px)] w-[100%] flex-col p-[16px]">
      <div className="flex font-airbnb font-black text-[24px]">
        Function Halls
      </div>
      {functionHalls.map((fH) => {
        return (
          <IndividualFunctionHall
            key={fH._id!}
            functionHall={fH}
            onClick={() => {
              navigate("/function-hall-management/function-hall/" + fH._id);
            }}
          />
        );
      })}
    </div>
  );
};

export default Home;
