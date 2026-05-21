import { Card, Typography, Progress } from "antd";

const { Title, Paragraph } = Typography;

const BreakTimer = ({ breakTimeLeft, breakTotalSeconds, formatTime }) => {
  const percentage = (breakTimeLeft / breakTotalSeconds) * 100;

  return (
    <Card className="rounded-3xl shadow-xl">
      <div className="text-center">
        <Paragraph type="secondary">Break Time ☕</Paragraph>

        <div className="flex justify-center mb-6">
          <Progress
            type="circle"
            percent={Math.floor(percentage)}
            size={220}
            strokeColor="#52c41a"
            format={() => formatTime(breakTimeLeft)}
          />
        </div>

        <Title level={4}>Relax for a few minutes</Title>
      </div>
    </Card>
  );
};

export default BreakTimer;
