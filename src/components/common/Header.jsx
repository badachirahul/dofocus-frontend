import { Layout, Button, Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const HeaderComponent = () => {
  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");

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

  return (
    <Header
      className="px-6 flex items-center justify-between bg-white border-b"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div className="cursor-pointer" onClick={() => navigate("/dashboard")}>
        <h1 className="text-2xl font-bold m-0 text-white">DoFocus</h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <Button type="primary" onClick={() => navigate("/focus/1")}>
          Start Focus
        </Button>

        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
        >
          <Avatar
            size="large"
            icon={<UserOutlined />}
            className="cursor-pointer"
          />
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderComponent;
