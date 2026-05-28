import { Checkbox, Button, Input, Space } from "antd";

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
    <div
      className={`group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-200 px-4 py-3.5 sm:px-5 sm:py-4 ${
        task.completed ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
        {/* Left */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <Checkbox
            checked={task.completed}
            onChange={() => handleToggleTask(task)}
          />

          {isEditing ? (
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onPressEnter={handleSave}
              autoFocus
            />
          ) : (
            <p
              className={`m-0 text-base sm:text-lg truncate ${
                task.completed
                  ? "line-through text-neutral-500"
                  : "text-white"
              }`}
            >
              {task.task_name}
            </p>
          )}
        </div>

        {/* Right */}
        <Space wrap size="small">
          {isEditing ? (
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={handleSave}
            >
              Save
            </Button>
          ) : (
            !task.completed && (
              <Button
                icon={<EditOutlined />}
                onClick={() => setIsEditing(true)}
                aria-label="Edit task"
              />
            )
          )}

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteTask(task.id)}
            aria-label="Delete task"
          />

          {!task.completed && (
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={() => navigate(`/focus/${task.id}`)}
            >
              Focus
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
};

export default TaskCard;
