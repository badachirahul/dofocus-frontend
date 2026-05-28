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
    <main className="min-h-svh w-full bg-[#0a0a0a] flex justify-center items-center px-4 relative overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <section className="relative w-full max-w-md fade-in-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-lg bg-white text-black flex items-center justify-center font-bold tracking-tight transition-transform duration-300 group-hover:scale-105">
              D
            </div>
            <span className="text-xl font-semibold text-white tracking-tight">
              DoFocus
            </span>
          </Link>
        </div>

        <div className="bg-[#111111] border border-white/[0.08] p-8 rounded-2xl flex flex-col gap-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-neutral-500 text-sm mt-1.5">
              Sign in to continue focusing
            </p>
          </div>

          {/* API Error */}
          {errors.api && (
            <div className="px-3 py-2.5 rounded-lg border border-red-500/20 bg-red-500/[0.06]">
              <p className="text-red-300 text-center text-sm m-0">
                {errors.api}
              </p>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-xs font-medium text-neutral-400 mb-1.5 block">
              Email
            </label>
            <Input
              placeholder="you@example.com"
              type="email"
              size="large"
              name="email"
              value={formData.email}
              onChange={handleChange}
              status={errors.email ? "error" : ""}
            />

            {errors.email && (
              <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-medium text-neutral-400 mb-1.5 block">
              Password
            </label>
            <Input.Password
              placeholder="••••••••"
              size="large"
              name="password"
              value={formData.password}
              onChange={handleChange}
              status={errors.password ? "error" : ""}
            />

            {errors.password && (
              <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>
            )}
          </div>

          {/* Button */}
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={handleLogin}
            className="!mt-2 !h-11 !font-medium"
          >
            Sign in
          </Button>

          {/* Register */}
          <p className="text-center text-neutral-500 text-sm m-0">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-white font-medium hover:underline underline-offset-4"
            >
              Create one
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
