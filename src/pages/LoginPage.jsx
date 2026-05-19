// LoginPage.jsx

import { useEffect, useState } from "react";
import { Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../features/auth/authApi";
import { setToken } from "../utils/localStorage";
const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Do Focus | Login";
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    api: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      api: "",
    }));
  };

  // Validate Form
  const validateForm = () => {
    let newErrors = {};

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email";
    }

    // Password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors((prev) => ({
      ...prev,
      ...newErrors,
    }));

    return Object.keys(newErrors).length === 0;
  };

  // Login
  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const response = await loginApi(formData);

    setLoading(false);

    // API Error
    if (!response.success) {
      setErrors((prev) => ({
        ...prev,
        api: response.message,
      }));

      return;
    }
    // // Save Token
    setToken(response.data.token);
    message.success("Login successful");

    // Redirect
    navigate("/dashboard");
  };

  return (
    <main className="h-svh w-full bg-[#f0f0f0] flex justify-center items-center px-4">
      <section className="w-full max-w-md shadow-2xl bg-white p-6 rounded-2xl flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        {/* API Error */}
        {errors.api && (
          <p className="text-red-500 text-center text-sm">{errors.api}</p>
        )}

        {/* Email */}
        <div>
          <Input
            placeholder="Email"
            type="email"
            size="large"
            name="email"
            value={formData.email}
            onChange={handleChange}
            status={errors.email ? "error" : ""}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <Input.Password
            placeholder="Password"
            size="large"
            name="password"
            value={formData.password}
            onChange={handleChange}
            status={errors.password ? "error" : ""}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Button */}
        <Button
          type="primary"
          size="large"
          loading={loading}
          onClick={handleLogin}
        >
          Login
        </Button>

        {/* Register */}
        <p className="text-center text-gray-600">
          If you don't have account, please{" "}
          <Link to="/register" className="underline">
            register
          </Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
