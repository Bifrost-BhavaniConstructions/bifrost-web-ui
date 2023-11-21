import SiteManagementHome from "../index";
import PR from "../PR";
import People from "../../common/People";
import React from "react";
import { PlatformEnum } from "../../../enums/PlatformEnum";
import CashAccount from "../../common/CashAccount";
import Sites from "../Sites";
import Assets from "../Assets";

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
    {
      path: "cash-account",
      element: <CashAccount platform={PlatformEnum.SITE} />,
    },
    {
      path: "sites",
      element: <Sites />,
    },
    {
      path: "assets",
      element: <Assets />,
    },
  ],
};

export default SiteManagementRoutes;
