import { useEffect, useState } from "react";

import { Typography, message, Tabs, Card } from "antd";

import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../layouts/MainLayout";

import TaskInput from "../components/task/TaskInput";
import TaskList from "../components/task/TaskList";

import {
  getTasksApi,
  createTaskApi,
  deleteTaskApi,
  updateTaskApi,
} from "../features/tasks/taskApi";
import {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  setFilter,
  setTasks,
} from "../features/tasks/taskSlice";

const { Title, Paragraph } = Typography;

const DashboardPage = () => {
  useEffect(() => {
    document.title = "Do Focus | Dashboard";
  }, []);

  const dispatch = useDispatch();

  // Redux State
  const { tasks, filter } = useSelector((state) => state.tasks);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasksApi();

      if (response.success) {
        dispatch(setTasks(response.data.tasks));
      }
    };

    fetchTasks();
  }, []);

  // Local State
  const [taskName, setTaskName] = useState("");

  // =========================
  // Add Task
  // =========================

  const handleAddTask = async () => {
    if (!taskName.trim()) {
      message.error("Task name is required");

      return;
    }

    const response = await createTaskApi({
      task_name: taskName,
    });

    if (!response.success) {
      message.error(response.message);

      return;
    }

    dispatch(addTask(response.data.task));

    setTaskName("");

    message.success("Task added");
  };

  // =========================
  // Delete Task
  // =========================

  const handleDeleteTask = async (id) => {
    dispatch(deleteTask(id));

    const response = await deleteTaskApi(id);

    if (!response.success) {
      message.error(response.message);

      return;
    }

    message.success("Task deleted");
  };

  // =========================
  // Toggle Task
  // =========================

  const handleToggleTask = async (task) => {
    dispatch(toggleTask(task.id));

    const response = await updateTaskApi(task.id, {
      task_name: task.task_name,
      completed: !task.completed,
    });

    if (!response.success) {
      message.error(response.message);
      return;
    }
  };

  // =========================
  // Edit Task
  // =========================

  const handleEditTask = async (id, updatedName, completed) => {
    dispatch(
      editTask({
        id,
        task_name: updatedName,
      }),
    );
    const response = await updateTaskApi(id, {
      task_name: updatedName,
      completed: completed,
    });

    if (!response.success) {
      message.error(response.message);
      return;
    }

    message.success("Task updated");
  };

  // =========================
  // Filter Tasks
  // =========================

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Pending") return !task.completed;

    if (filter === "Completed") return task.completed;

    return true;
  });

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
      label: `Pending (${tasks.filter((task) => !task.completed).length})`,
    },
    {
      key: "Completed",
      label: `Completed (${tasks.filter((task) => task.completed).length})`,
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 min-h-svh">
        {/* Welcome */}
        <div>
          <Title level={2}>Welcome Back 👋</Title>

          <Paragraph type="secondary">
            Manage your tasks and stay productive with DoFocus.
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
            onChange={(value) => dispatch(setFilter(value))}
          />

          {/* Task List */}
          <TaskList
            tasks={filteredTasks}
            handleDeleteTask={handleDeleteTask}
            handleToggleTask={handleToggleTask}
            handleEditTask={handleEditTask}
          />
        </Card>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
