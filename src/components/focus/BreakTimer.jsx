import { Typography, Progress } from "antd";

const { Title, Paragraph } = Typography;

const BreakTimer = ({ breakTimeLeft, breakTotalSeconds, formatTime }) => {
  const percentage = (breakTimeLeft / breakTotalSeconds) * 100;

  return (
    <div className="text-center py-4">
      <Paragraph className="!m-0 !text-[11px] uppercase tracking-[0.18em] !text-neutral-500 font-medium">
        Break Time ☕
      </Paragraph>

      <Title
        level={2}
        className="!mt-3 !mb-8 !text-white !tracking-tight !text-3xl !font-semibold"
      >
        Take a breather
      </Title>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full bg-white/[0.04] blur-2xl scale-110"
          />
          <div className="relative timer-pulse rounded-full">
            <Progress
              type="circle"
              percent={Math.floor(percentage)}
              size={240}
              strokeWidth={4}
              strokeColor="#ffffff"
              trailColor="rgba(255,255,255,0.06)"
              format={() => (
                <span className="text-white text-5xl font-semibold tracking-tighter tabular-nums">
                  {formatTime(breakTimeLeft)}
                </span>
              )}
            />
          </div>
        </div>
      </div>

      <Paragraph className="!m-0 !text-neutral-500 !text-sm">
        Relax for a few minutes. You earned it.
      </Paragraph>
    </div>
  );
};

export default BreakTimer;
