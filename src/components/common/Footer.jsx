import { Layout } from "antd";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer className="!px-0 !py-0">
      <div className="border-t border-white/[0.08] bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="h-6 w-6 rounded-md bg-white text-black flex items-center justify-center font-bold text-xs tracking-tight">
                D
              </div>
              <h1 className="text-base font-semibold m-0 text-white tracking-tight">
                DoFocus
              </h1>
            </div>

            <p className="text-neutral-500 text-sm m-0 mt-1.5">
              Focus better. Complete more.
            </p>
          </div>

          {/* Center */}
          <div className="flex items-center gap-6 text-sm hidden">
            <a
              href="#"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              Terms
            </a>

            <a
              href="#"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 hidden">
            <a
              href="#"
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200"
            >
              <GithubOutlined className="text-base" />
            </a>

            <a
              href="#"
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200"
            >
              <LinkedinOutlined className="text-base" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-neutral-500 text-xs">
            © 2026 DoFocus. All rights reserved.
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
