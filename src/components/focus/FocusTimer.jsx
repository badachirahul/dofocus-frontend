import { Typography, Progress } from "antd";

const { Paragraph } = Typography;

const FocusTimer = ({ timeLeft, totalSeconds, formatTime }) => {
  const percentage = (timeLeft / totalSeconds) * 100;

  return (
    <div className="text-center mb-10">
      <div className="flex justify-center mb-6">
        <Progress
          type="circle"
          percent={Math.floor(percentage)}
          size={260}
          strokeColor="#000"
          format={() => formatTime(timeLeft)}
        />
      </div>

      <Paragraph type="secondary">
        Stay focused and avoid distractions.
      </Paragraph>
    </div>
  );
};

export default FocusTimer;
