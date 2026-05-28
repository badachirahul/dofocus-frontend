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
            addonAfter={
              <span className="text-neutral-500 text-xs">min</span>
            }
          />

          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            Save
          </Button>
        </Space>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-neutral-300 text-sm font-medium hover:bg-white/[0.08] hover:border-white/20 hover:text-white transition-all duration-200 cursor-pointer"
        >
          <EditOutlined className="text-xs" />
          Edit Timer
        </button>
      )}
    </div>
  );
};

export default TimerEditor;
