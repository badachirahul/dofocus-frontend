import { Layout } from "antd";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Content className="bg-[#f5f5f5] px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </Content>

      {/* Footer */}
      <Footer />
    </Layout>
  );
};

export default MainLayout;