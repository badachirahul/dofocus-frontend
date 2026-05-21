import { BASE_URL } from "../../config/config";

// ====================================
// Start Focus Session
// ====================================
import { getToken } from "../utils/localStorage";

export const startFocusSessionApi = async (focusData) => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/focus/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(focusData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,

        message: data.message || "Failed to start focus session",
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
// Pause Focus Session
// ====================================

export const pauseFocusSessionApi = async (sessionId) => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/focus/pause/${sessionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,

        message: data.message || "Failed to pause session",
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
// Resume Focus Session
// ====================================

export const resumeFocusSessionApi = async (sessionId) => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/focus/resume/${sessionId}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,

        message: data.message || "Failed to resume session",
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
// Finish Focus Session
// ====================================

export const finishFocusSessionApi = async (sessionId) => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/focus/finish/${sessionId}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,

        message: data.message || "Failed to finish session",
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
// Cancel Focus Session
// ====================================

export const cancelFocusSessionApi = async (sessionId) => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/focus/cancel/${sessionId}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,

        message: data.message || "Failed to cancel session",
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
// Get Current Session By Task
// ====================================

export const getCurrentSessionApi = async (taskId) => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/focus/task/${taskId}`, {
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

        message: data.message || "Failed to get session",
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
