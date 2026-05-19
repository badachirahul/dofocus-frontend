// src/features/tasks/taskApi.js

import { BASE_URL } from "../../config/config";

// ====================================
// Get All Tasks API
// ====================================

export const getTasksApi = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,

        message: data.message || "Failed to fetch tasks",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,

      message: "Server error. Please try again. " + error.message,
    };
  }
};

// ====================================
// Create Task API
// ====================================

export const createTaskApi = async (taskData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(taskData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,

        message: data.message || "Failed to create task",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,

      message: "Server error. Please try again. " + error.message,
    };
  }
};

// ====================================
// Update Task API
// ====================================

export const updateTaskApi = async (id, updatedData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(updatedData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,

        message: data.message || "Failed to update task",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,

      message: "Server error. Please try again. " + error.message,
    };
  }
};

// ====================================
// Delete Task API
// ====================================

export const deleteTaskApi = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,

        message: data.message || "Failed to delete task",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,

      message: "Server error. Please try again. " + error.message,
    };
  }
};
