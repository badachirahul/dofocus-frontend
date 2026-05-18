import { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

const DashboardPage = () => {
      useEffect(() => {
        document.title = "Do Focus | Dashboard";
      }, []);
  return (
    <MainLayout>
        <div className="h-svh">
      <h1 className="text-3xl font-bold">
        Dashboard Page
      </h1>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;