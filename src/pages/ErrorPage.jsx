import { Result, Button } from "antd";

import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const error = useRouteError();

  return (
    <main className="min-h-svh flex justify-center items-center bg-gray-100 p-4">
      <Result
        status="404"
        title={error?.status || "404"}
        subTitle={
          error?.statusText || "Sorry, the page you visited does not exist."
        }
        extra={
          <Button type="primary" onClick={() => navigate("/dashboard")}>
            Back Home
          </Button>
        }
      />
    </main>
  );
};

export default ErrorPage;
