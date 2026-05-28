import { Empty } from "antd";

import TaskCard from "./TaskCard";

const TaskList = ({
  tasks,
  handleDeleteTask,
  handleToggleTask,
  handleEditTask,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="py-10">
        <Empty
          description={
            <span className="text-neutral-500 text-sm">No tasks yet</span>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5 pt-2">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          handleDeleteTask={handleDeleteTask}
          handleToggleTask={handleToggleTask}
          handleEditTask={handleEditTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
