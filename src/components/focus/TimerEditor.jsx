import { InputNumber, Button, Space, message } from "antd";

import { EditOutlined, SaveOutlined } from "@ant-design/icons";

const TimerEditor = ({
  isEditing,
  editMinutes,
  setEditMinutes,
  setIsEditing,
  handleSaveTimer,
  sessionStatus,
}) => {
  if (sessionStatus !== "idle" && sessionStatus !== "cancelled") {
    return null;
  }

  const handleChange = (value) => {
    // Empty or invalid
    if (value === null || value === undefined || Number.isNaN(value)) {
      setEditMinutes(25);

      return;
    }

    // Min 1
    if (value <= 0) {
      setEditMinutes(1);

      return;
    }

    // Max 180
    if (value > 180) {
      setEditMinutes(180);

      return;
    }

    setEditMinutes(value);
  };

  const handleSave = () => {
    // Final validation fallback
    if (!editMinutes || Number.isNaN(editMinutes)) {
      setEditMinutes(25);

      message.warning("Invalid timer. Reset to 25 min");

      return;
    }

    handleSaveTimer();
  };

  return (
    <div className="flex justify-center mb-8">
      {isEditing ? (
        <Space>
          <InputNumber
            min={1}
            max={180}
            value={editMinutes}
            onChange={handleChange}
          />

          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            Save
          </Button>
        </Space>
      ) : (
        <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
          Edit Timer
        </Button>
      )}
    </div>
  );
};

export default TimerEditor;
