import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginRedirect from "./pages/LoginRedirect";
import React from "react";
import Routes from "./pages/SiteManagement/Routes/routes";
import FunctionHallManagementRoutes from "./pages/FunctionHallManagement/Routes/routes";
import Login from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/login-redirect",
    element: <LoginRedirect />,
  },
  {
    path: "/",
    element: <Navigate to="/function-hall-management" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  Routes,
  FunctionHallManagementRoutes,
]);

const BifrostRouter = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default BifrostRouter;
