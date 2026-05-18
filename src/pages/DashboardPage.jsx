// src/pages/DashboardPage.jsx

import { useEffect, useState } from "react";

import {
  Typography,
  message,
  Tabs,
  Card,
} from "antd";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import MainLayout from "../layouts/MainLayout";

import TaskInput from "../components/task/TaskInput";
import TaskList from "../components/task/TaskList";

import {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  setFilter,
} from "../features/tasks/taskSlice";

const { Title, Paragraph } =
  Typography;

const DashboardPage = () => {
  useEffect(() => {
    document.title =
      "Do Focus | Dashboard";
  }, []);

  const dispatch = useDispatch();

  // Redux State
  const { tasks, filter } = useSelector(
    (state) => state.tasks
  );

  // Local State
  const [taskName, setTaskName] =
    useState("");

  // =========================
  // Add Task
  // =========================

  const handleAddTask = () => {
    if (!taskName.trim()) {
      message.error(
        "Task name is required"
      );

      return;
    }

    const newTask = {
      id: Date.now(),
      task_name: taskName,
      completed: false,
    };

    dispatch(addTask(newTask));

    setTaskName("");

    message.success("Task added");
  };

  // =========================
  // Delete Task
  // =========================

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));

    message.success("Task deleted");
  };

  // =========================
  // Toggle Task
  // =========================

  const handleToggleTask = (id) => {
    dispatch(toggleTask(id));
  };

  // =========================
  // Edit Task
  // =========================

  const handleEditTask = (
    id,
    updatedName
  ) => {
    if (!updatedName.trim()) {
      message.error(
        "Task name cannot be empty"
      );

      return;
    }

    dispatch(
      editTask({
        id,
        task_name: updatedName,
      })
    );

    message.success("Task updated");
  };

  // =========================
  // Filter Tasks
  // =========================

  const filteredTasks = tasks.filter(
    (task) => {
      if (filter === "Pending")
        return !task.completed;

      if (filter === "Completed")
        return task.completed;

      return true;
    }
  );

  // =========================
  // Tabs
  // =========================

  const tabItems = [
    {
      key: "All",
      label: `All (${tasks.length})`,
    },
    {
      key: "Pending",
      label: `Pending (${
        tasks.filter(
          (task) => !task.completed
        ).length
      })`,
    },
    {
      key: "Completed",
      label: `Completed (${
        tasks.filter(
          (task) => task.completed
        ).length
      })`,
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 min-h-svh">
        
        {/* Welcome */}
        <div>
          <Title level={2}>
            Welcome Back 👋
          </Title>

          <Paragraph type="secondary">
            Manage your tasks and stay
            productive with DoFocus.
          </Paragraph>
        </div>

        {/* Task Input */}
        <TaskInput
          taskName={taskName}
          setTaskName={setTaskName}
          handleAddTask={handleAddTask}
        />

        {/* Tabs + Task List */}
        <Card className="rounded-2xl shadow-sm">
          
          {/* Filter Tabs */}
          <Tabs
            activeKey={filter}
            items={tabItems}
            onChange={(value) =>
              dispatch(setFilter(value))
            }
          />

          {/* Task List */}
          <TaskList
            tasks={filteredTasks}
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
        </Card>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;