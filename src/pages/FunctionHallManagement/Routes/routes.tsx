import FunctionHallManagement from "../index";
import People from "../../common/People";
import React from "react";
import { PlatformEnum } from "../../../enums/PlatformEnum";

const FunctionHallManagementRoutes = {
  path: "/function-hall-management/",
  element: <FunctionHallManagement />,
  children: [
    {
      path: "people",
      element: <People platform={PlatformEnum.FUNCTION_HALL} />,
    },
  ],
};

export default FunctionHallManagementRoutes;
