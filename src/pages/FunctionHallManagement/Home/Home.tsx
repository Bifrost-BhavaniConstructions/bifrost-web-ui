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
    <div className="flex h-[calc(100%-40px)] md:h-full w-[100%] overflow-y-auto md:overflow-y-hidden flex-col p-[16px]">
      <div className="flex font-airbnb font-black justify-center text-[24px] pb-[24px] pt-[8px]">
        Function Halls
      </div>
      <div className="flex flex-col flex-1 md:flex-row flex-wrap gap-[8px]">
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
    </div>
  );
};

export default Home;
