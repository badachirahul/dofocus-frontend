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

  // Stats summary
  const totalCount = tasks.length;
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <MainLayout>
      <div className="space-y-8 min-h-svh">
        {/* Welcome */}
        <div className="fade-in-up">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <Title
                level={2}
                className="!m-0 !text-white !tracking-tight !text-3xl md:!text-4xl"
              >
                Welcome Back 👋
              </Title>

              <Paragraph className="!m-0 !mt-2 !text-neutral-400">
                Manage your tasks and stay productive with DoFocus.
              </Paragraph>
            </div>

            {/* Stats summary chips */}
            <div className="flex flex-wrap gap-2">
              <div className="px-3.5 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03]">
                <div className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-medium">
                  Total
                </div>
                <div className="text-lg font-semibold text-white tabular-nums leading-none mt-1">
                  {totalCount}
                </div>
              </div>
              <div className="px-3.5 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03]">
                <div className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-medium">
                  Pending
                </div>
                <div className="text-lg font-semibold text-white tabular-nums leading-none mt-1">
                  {pendingCount}
                </div>
              </div>
              <div className="px-3.5 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03]">
                <div className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-medium">
                  Done
                </div>
                <div className="text-lg font-semibold text-white tabular-nums leading-none mt-1">
                  {completedCount}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Input */}
        <TaskInput
          taskName={taskName}
          setTaskName={setTaskName}
          handleAddTask={handleAddTask}
        />

        {/* Tabs + Task List */}
        <Card className="!rounded-2xl !bg-[#111111] !border-white/[0.08]">
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
