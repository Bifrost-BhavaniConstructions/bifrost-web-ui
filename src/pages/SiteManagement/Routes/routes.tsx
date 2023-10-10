import SiteManagementHome from "../index";
import PR from "../PR";
import People from "../../common/People";
import React from "react";
import { PlatformEnum } from "../../../enums/PlatformEnum";

const SiteManagementRoutes = {
  path: "/site-management/",
  element: <SiteManagementHome />,
  children: [
    {
      path: "pr",
      element: <PR />,
    },
    {
      path: "people",
      element: <People platform={PlatformEnum.SITE} />,
    },
  ],
};

export default SiteManagementRoutes;
