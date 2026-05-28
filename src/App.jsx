import { RouterProvider } from "react-router-dom";
import { ConfigProvider, theme } from "antd"; // 1️⃣ Import ConfigProvider
import AppRoutes from "./routes/AppRoutes";

function App() {
  // 2️⃣ Wrap RouterProvider with the theme prop configured to black
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#ffffff",
          colorBgBase: "#0a0a0a",
          colorTextBase: "#f5f5f5",
          borderRadius: 12,
          fontFamily:
            "'Geist', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        },
        components: {
          Button: {
            controlHeight: 40,
            controlHeightLG: 48,
            borderRadius: 10,
            fontWeight: 500,
          },
          Input: {
            controlHeight: 44,
            borderRadius: 10,
          },
          Card: {
            borderRadiusLG: 18,
          },
          Modal: {
            borderRadiusLG: 20,
          },
        },
      }}
    >
      <RouterProvider router={AppRoutes} />
    </ConfigProvider>
  );
}

export default App;
