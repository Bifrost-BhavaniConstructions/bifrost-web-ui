import FunctionHallManagement from "../index";
import People from "../People";
import React from "react";

const FunctionHallManagementRoutes = {
  path: "/function-hall-management/",
  element: <FunctionHallManagement />,
  children: [
    {
      path: "people",
      element: <People />,
    },
  ],
};

export default FunctionHallManagementRoutes;
