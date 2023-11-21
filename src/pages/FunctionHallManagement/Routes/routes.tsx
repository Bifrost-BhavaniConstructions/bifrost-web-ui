import FunctionHallManagement from "../index";
import People from "../../common/People";
import React from "react";
import { PlatformEnum } from "../../../enums/PlatformEnum";
import Home from "../Home";
import Queries from "../Enquiry";
import FunctionHallList from "../FunctionHallList";
import CashAccount from "../../common/CashAccount";
import AllTransactions from "../../common/CashAccount/AllTransactions";

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
      path: "cash-accounts",
      element: <CashAccount platform={PlatformEnum.FUNCTION_HALL} />,
    },
    {
      path: "all-transactions",
      element: <AllTransactions />,
    },
  ],
};
export default FunctionHallManagementRoutes;
