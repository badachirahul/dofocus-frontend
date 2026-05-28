import { Layout } from "antd";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout className="min-h-screen relative">
      {/* Ambient gradient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[#0a0a0a]"
      >
        <div className="absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <Content className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </Content>

      {/* Footer */}
      <Footer />
    </Layout>
  );
};

export default MainLayout;
