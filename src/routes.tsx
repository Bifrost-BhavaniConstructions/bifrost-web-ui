import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import LoginRedirect from "./pages/LoginRedirect";
import SiteManagementHome from "./pages/SiteManagement";
import React from "react";
import PR from "./pages/SiteManagement/PR";

 export const router = createBrowserRouter([
    {
        path: "/login-redirect",
        element: <LoginRedirect />,
    },
    {
        path: "/",
        element: <Navigate to="/site-management" />,
    },
    {
        path: "/site-management/",
        element: <SiteManagementHome />,
        children: [
            {
                path: "pr",
                element: <PR />,
            },
        ]
    },
]);

 const BifrostRouter = () => {
     return <RouterProvider router={router}></RouterProvider>
 }

 export default BifrostRouter;
