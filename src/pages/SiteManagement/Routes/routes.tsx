import SiteManagementHome from "../index";
import PR from "../PR";
import People from "../People";
import React from "react";

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
      element: <People />,
    },
  ],
};

export default SiteManagementRoutes;
