import { BASE_URL } from "../../config/config";

// ================================
// Send OTP API
// ================================
export const sendOtpApi = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to send OTP",
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

// ================================
// Verify OTP API
// ================================
export const verifyOtpApi = async (email, otp) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Invalid OTP",
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

// ================================
// Register API
// ================================
export const registerApi = async (registerData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Registration failed",
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

// ================================
// Login API
// ================================
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
  } catch {
    return {
      success: false,
      message: "Server error. Please try again.",
    };
  }
};
