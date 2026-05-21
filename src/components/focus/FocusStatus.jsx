import { Tag } from "antd";

const FocusStatus = ({ sessionStatus }) => {
  const getStatusColor = () => {
    switch (sessionStatus) {
      case "active":
        return "green";

      case "paused":
        return "orange";

      case "completed":
        return "blue";

      case "cancelled":
        return "red";

      default:
        return "default";
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <Tag color={getStatusColor()} className="px-4 py-1 text-base">
        {sessionStatus.toUpperCase()}
      </Tag>
    </div>
  );
};

export default FocusStatus;
