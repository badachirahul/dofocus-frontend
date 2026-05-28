import { Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const TaskInput = ({ taskName, setTaskName, handleAddTask }) => {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#111111] p-3 sm:p-4 fade-in-up">
      <div className="flex gap-2 sm:gap-3">
        <Input
          size="large"
          placeholder="What do you want to focus on?"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onPressEnter={handleAddTask}
          className="!flex-1"
        />

        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={handleAddTask}
          className="!px-5"
        >
          <span className="hidden sm:inline">Add Task</span>
        </Button>
      </div>
    </div>
  );
};

export default TaskInput;
