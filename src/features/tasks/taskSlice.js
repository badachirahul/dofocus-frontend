import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  filter: "All",
};

const taskSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {
    // Add Task
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },

    // Delete Task
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
    },

    // Toggle Complete
    toggleTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      );
    },

    // Edit Task
    editTask: (state, action) => {
      const { id, task_name } =
        action.payload;

      state.tasks = state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              task_name,
            }
          : task
      );
    },

    // Filter
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    // Set All Tasks
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  setFilter,
  setTasks,
} = taskSlice.actions;

export default taskSlice.reducer;