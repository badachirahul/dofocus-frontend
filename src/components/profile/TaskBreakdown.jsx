const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  if (hrs > 0) {
    return `${hrs}h ${mins}m`;
  } else if (mins > 0) {
    return `${mins}m ${sec}s`;
  } else {
    return `${sec}s`;
  }
};

const TaskBreakdown = ({ tasks }) => {
  return (
    <div className="mt-6">
      <h2 className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-medium mb-4">
        Daily Focus Analytics
      </h2>

      {(!tasks || tasks.length === 0) && (
        <div className="px-4 py-8 rounded-xl border border-dashed border-white/10 text-center text-neutral-500 text-sm">
          No focus sessions recorded for this day.
        </div>
      )}

      <div className="space-y-2.5">
        {tasks?.map((task, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-200"
          >
            <p className="font-medium text-white m-0 truncate pr-4">
              {task.taskName}
            </p>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-neutral-500">focused</span>
              <p className="text-white font-semibold tabular-nums m-0">
                {formatTime(task.focusedSeconds)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBreakdown;
