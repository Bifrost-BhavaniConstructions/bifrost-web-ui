import SiteManagementHome from "../index";
import PR from "../PR";
import People from "../../common/People";
import React from "react";
import { PlatformEnum } from "../../../enums/PlatformEnum";
import CashAccount from "../../common/CashAccount";
import Sites from "../Sites";
import Assets from "../Assets";
import Home from "../Home";
import AllTransactions from "../../common/CashAccount/AllTransactions";

const SiteManagementRoutes = {
  path: "/site-management/",
  element: <SiteManagementHome />,
  children: [
    {
      path: "",
      element: <Home />,
    },
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
    {
      path: "all-transactions",
      element: <AllTransactions />,
    },
  ],
};

export default SiteManagementRoutes;
