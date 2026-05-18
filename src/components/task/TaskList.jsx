import { Empty, Space } from "antd";

import TaskCard from "./TaskCard";

const TaskList = ({
  tasks,
  handleDeleteTask,
  handleToggleTask,
  handleEditTask,
}) => {
  if (tasks.length === 0) {
    return (
      <Empty description="No Tasks Found" />
    );
  }

  return (
    <Space
      direction="vertical"
      size="middle"
      className="w-full"
    >
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          handleDeleteTask={
            handleDeleteTask
          }
          handleToggleTask={
            handleToggleTask
          }
          handleEditTask={
            handleEditTask
          }
        />
      ))}
    </Space>
  );
};

export default TaskList;