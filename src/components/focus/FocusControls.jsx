import { Button, Space } from "antd";

import {
  PauseOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const FocusControls = ({
  sessionStatus,
  handleStart,
  handlePause,
  handleResume,
  handleFinish,
  handleCancel,
}) => {
  return (
    <div className="flex justify-center">
      <Space wrap size="middle">
        {/* Start */}
        {sessionStatus === "idle" && (
          <Button
            type="primary"
            size="large"
            icon={<PlayCircleOutlined />}
            onClick={handleStart}
            className="!px-6"
          >
            Start
          </Button>
        )}

        {/* Pause */}
        {sessionStatus === "active" && (
          <Button
            className="hidden!"
            size="large"
            icon={<PauseOutlined />}
            onClick={handlePause}
          >
            Pause
          </Button>
        )}

        {/* Resume */}
        {sessionStatus === "paused" && (
          <Button
            className="hidden!"
            type="primary"
            size="large"
            icon={<ReloadOutlined />}
            onClick={handleResume}
          >
            Resume
          </Button>
        )}

        {/* Finish */}
        {(sessionStatus === "active" || sessionStatus === "paused") && (
          <Button
            type="primary"
            size="large"
            icon={<CheckCircleOutlined />}
            onClick={handleFinish}
            className="!px-6"
          >
            Finish
          </Button>
        )}

        {/* Cancel */}
        {(sessionStatus === "active" || sessionStatus === "paused") && (
          <Button
            danger
            size="large"
            icon={<CloseCircleOutlined />}
            onClick={handleCancel}
            className="!px-6"
          >
            Cancel
          </Button>
        )}
      </Space>
    </div>
  );
};

export default FocusControls;
