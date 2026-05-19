import { Card, Checkbox, Button, Input, Space } from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskCard = ({
  task,
  handleDeleteTask,
  handleToggleTask,
  handleEditTask,
}) => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [editText, setEditText] = useState(task.task_name);

  const handleSave = () => {
    handleEditTask(task.id, editText, task.completed);

    setIsEditing(false);
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-4 flex-1">
          <Checkbox
            checked={task.completed}
            onChange={() => handleToggleTask(task)}
          />

          {isEditing ? (
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onPressEnter={handleSave}
            />
          ) : (
            <p
              className={`m-0 text-lg ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.task_name}
            </p>
          )}
        </div>

        {/* Right */}
        <Space wrap>
          {isEditing ? (
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={handleSave}
            >
              Save
            </Button>
          ) : (
            <Button
              icon={<EditOutlined />}
              onClick={() => setIsEditing(true)}
            />
          )}

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteTask(task.id)}
          />

          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={() => navigate(`/focus/${task.id}`)}
          >
            Focus
          </Button>
        </Space>
      </div>
    </Card>
  );
};

export default TaskCard;
