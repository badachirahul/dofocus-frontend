import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import FocusPage from "../pages/FocusPage";
import ProfilePage from "../pages/ProfilePage";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/focus/:taskId",
    element: <FocusPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);

export default AppRoutes;
