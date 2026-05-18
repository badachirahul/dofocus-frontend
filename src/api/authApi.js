import { BASE_URL } from "../config/config";

export const loginApi = async (loginData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    
    // Backend Error
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Login failed",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    // Network Error
    return {
      success: false,
      message: "Server error. Please try again later. " + error.message,
    };
  }
};
