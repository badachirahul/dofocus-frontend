import { Input, Button, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const TaskInput = ({
  taskName,
  setTaskName,
  handleAddTask,
}) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <div className="flex gap-3">
        <Input
          size="large"
          placeholder="Enter your task..."
          value={taskName}
          onChange={(e) =>
            setTaskName(e.target.value)
          }
          onPressEnter={handleAddTask}
        />

        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={handleAddTask}
        >
          Add
        </Button>
      </div>
    </Card>
  );
};

export default TaskInput;