import FunctionHallManagement from "../index";
import People from "../../common/People";
import React from "react";
import { PlatformEnum } from "../../../enums/PlatformEnum";
import Home from "../Home";
import Queries from "../Enquiry";
import FunctionHallList from "../FunctionHallList";

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
  ],
};
export default FunctionHallManagementRoutes;
