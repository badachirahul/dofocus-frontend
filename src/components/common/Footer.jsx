import { Layout } from "antd";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer className="bg-white border-t px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left */}
        <div>
          <h1 className="text-lg font-bold m-0">
            DoFocus
          </h1>

          <p className="text-gray-500 text-sm m-0">
            Focus better. Complete more.
          </p>
        </div>

        {/* Center */}
        <div className="flex items-center gap-6 text-sm">
          <a href="#" className="text-gray-600 hover:text-black">
            Privacy
          </a>

          <a href="#" className="text-gray-600 hover:text-black">
            Terms
          </a>

          <a href="#" className="text-gray-600 hover:text-black">
            Contact
          </a>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 text-xl">
          <GithubOutlined className="cursor-pointer hover:text-black" />

          <LinkedinOutlined className="cursor-pointer hover:text-blue-600" />
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 text-sm mt-4">
        © 2026 DoFocus. All rights reserved.
      </div>
    </Footer>
  );
};

export default FooterComponent;