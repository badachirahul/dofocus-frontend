const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  if (hrs > 0) {
    return `${hrs}h ${mins}m`;
  }

  return `${mins}m`;
};

const TaskBreakdown = ({ tasks }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200  shadow-sm">
      <h2 className="text-xl font-bold  mb-6">Task Breakdown</h2>

      <div className="space-y-4">
        {tasks?.map((task, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3 rounded-xl border"
          >
            <p className=" font-medium">{task.taskName}</p>

            <p className="text-green-500 font-semibold">
              {formatTime(task.focusedSeconds)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBreakdown;
