import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage"

function LoginPage() {
  return <div className="p-10 text-3xl font-bold">Login Page</div>;
}

function RegisterPage() {
  return <div className="p-10 text-3xl font-bold">Register Page</div>;
}

function DashboardPage() {
  return <div className="p-10 text-3xl font-bold">Dashboard Page</div>;
}

function FocusPage() {
  return <div className="p-10 text-3xl font-bold">Focus Page</div>;
}

function ProfilePage() {
  return <div className="p-10 text-3xl font-bold">Profile Page</div>;
}

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
