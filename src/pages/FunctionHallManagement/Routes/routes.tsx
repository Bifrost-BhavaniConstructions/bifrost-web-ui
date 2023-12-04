import FunctionHallManagement from "../index";
import People from "../../common/People";
import React from "react";
import { PlatformEnum } from "../../../enums/PlatformEnum";
import Home from "../Home";
import Queries from "../Enquiry";
import FunctionHallList from "../FunctionHallList";
import CashAccount from "../../common/CashAccount";
import AllTransactions from "../../common/CashAccount/AllTransactions";
import HomeFunctionHall from "../Home/HomeFunctionHall";

const FunctionHallManagementRoutes = {
  path: "/function-hall-management/",
  element: <FunctionHallManagement />,
  children: [
    {
      path: "",
      element: <Home />,
    },
    {
      path: "people",
      element: <People platform={PlatformEnum.FUNCTION_HALL} />,
    },
    {
      path: "function-hall",
      element: <FunctionHallList />,
    },
    {
      path: "queries",
      element: <Queries />,
    },
    {
      path: "closed-queries",
      element: <Queries closed />,
    },
    {
      path: "cash-accounts",
      element: <CashAccount platform={PlatformEnum.FUNCTION_HALL} />,
    },
    {
      path: "all-transactions",
      element: <AllTransactions />,
    },
    {
      path: "function-hall/:fh_id", // New dynamic route with parameter
      element: <HomeFunctionHall />, // Replace FunctionHallDetail with your desired component
    },
  ],
};
export default FunctionHallManagementRoutes;
