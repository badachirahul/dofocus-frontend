import { Typography, Progress } from "antd";

const { Paragraph } = Typography;

const FocusTimer = ({ timeLeft, totalSeconds, formatTime }) => {
  const percentage = (timeLeft / totalSeconds) * 100;

  return (
    <div className="text-center mb-10">
      <div className="flex justify-center mb-6">
        <div className="relative">
          {/* Subtle glow halo */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-full bg-white/[0.04] blur-2xl scale-110"
          />
          <div className="relative timer-pulse rounded-full">
            <Progress
              type="circle"
              percent={Math.floor(percentage)}
              size={280}
              strokeWidth={4}
              strokeColor="#ffffff"
              trailColor="rgba(255,255,255,0.06)"
              format={() => (
                <span className="text-white text-5xl md:text-6xl font-semibold tracking-tighter tabular-nums">
                  {formatTime(timeLeft)}
                </span>
              )}
            />
          </div>
        </div>
      </div>

      <Paragraph className="!m-0 !text-neutral-500 !text-sm">
        Stay focused and avoid distractions.
      </Paragraph>
    </div>
  );
};

export default FocusTimer;
