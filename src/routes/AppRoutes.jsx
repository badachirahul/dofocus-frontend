import { createBrowserRouter, Outlet } from "react-router-dom";

import ErrorPage from "../pages/ErrorPage";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import FocusPage from "../pages/FocusPage";
import ProfilePage from "../pages/ProfilePage";

const RootLayout = () => {
  return <Outlet />;
};

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "focus/:taskId",
        element: <FocusPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default AppRoutes;
