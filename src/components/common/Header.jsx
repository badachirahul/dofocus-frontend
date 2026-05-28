import { Layout, Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/localStorage";

const { Header } = Layout;

const HeaderComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Logout
  const handleLogout = () => {
    removeToken();

    navigate("/login");
  };

  // Dropdown Items
  const items = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: handleLogout,
    },
  ];

  // const navItems = [
  //   { label: "Dashboard", path: "/dashboard" },
  //   { label: "Profile", path: "/profile" },
  // ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <Header
      className="!h-16 !px-0 !leading-none"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "transparent",
      }}
    >
      <div className="h-16 w-full border-b border-white/[0.08] bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div
            className="cursor-pointer group flex items-center gap-2.5"
            onClick={() => navigate("/dashboard")}
          >
            <div className="h-8 w-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-sm tracking-tight transition-transform duration-300 group-hover:scale-105">
              D
            </div>
            <h1 className="text-[17px] font-semibold m-0 text-white tracking-tight">
              DoFocus
            </h1>
          </div>

          {/* Center nav (desktop only) */}
          {/* <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full p-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-white text-black font-medium"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav> */}

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div className="cursor-pointer h-9 w-9 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200 flex items-center justify-center">
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  style={{
                    background: "transparent",
                    border: "none",
                  }}
                />
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
