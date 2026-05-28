const FocusStatus = ({ sessionStatus }) => {
  const getStatusConfig = () => {
    switch (sessionStatus) {
      case "active":
        return {
          dot: "bg-white",
          ring: "ring-white/20",
          text: "text-white",
          pulse: true,
        };
      case "paused":
        return {
          dot: "bg-neutral-400",
          ring: "ring-white/10",
          text: "text-neutral-300",
          pulse: false,
        };
      case "completed":
        return {
          dot: "bg-white",
          ring: "ring-white/20",
          text: "text-white",
          pulse: false,
        };
      case "cancelled":
        return {
          dot: "bg-neutral-600",
          ring: "ring-white/10",
          text: "text-neutral-500",
          pulse: false,
        };
      default:
        return {
          dot: "bg-neutral-500",
          ring: "ring-white/10",
          text: "text-neutral-400",
          pulse: false,
        };
    }
  };

  const cfg = getStatusConfig();

  return (
    <div className="flex justify-center mb-8">
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] ring-1 ${cfg.ring}`}
      >
        <span className="relative flex h-2 w-2">
          {cfg.pulse && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cfg.dot} opacity-60`}
            />
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${cfg.dot}`}
          />
        </span>
        <span
          className={`text-[11px] uppercase tracking-[0.16em] font-semibold ${cfg.text}`}
        >
          {sessionStatus}
        </span>
      </div>
    </div>
  );
};

export default FocusStatus;
