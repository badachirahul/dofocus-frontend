import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd"; // 1️⃣ Import ConfigProvider
import AppRoutes from "./routes/AppRoutes";

function App() {
  // 2️⃣ Wrap RouterProvider with the theme prop configured to black
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
      <RouterProvider router={AppRoutes} />
    </ConfigProvider>
  );
}

export default App;
