import { useEffect, useState } from "react";
import { Input, Button, Flex, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { sendOtpApi, verifyOtpApi, registerApi } from "../features/auth/authApi";
const RegisterPage = () => {
  useEffect(() => {
    document.title = "Do Focus | Register";
  }, []);
  const navigate = useNavigate();
  // =========================
  // States
  // =========================
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    fullName: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    otp: "",
    fullName: "",
    password: "",
    api: "",
  });

  // OTP Steps
  // step 1 -> send otp
  // step 2 -> otp sent
  // step 3 -> otp verified
  // step 4 -> registered

  const [otpStep, setOtpStep] = useState(1);

  const [loading, setLoading] = useState({
    sendOtp: false,
    verifyOtp: false,
    register: false,
  });

  // =========================
  // Handle Input
  // =========================
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

  // OTP Input
  const handleOtpChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      otp: value,
    }));

    setErrors((prev) => ({
      ...prev,
      otp: "",
    }));
  };

  // =========================
  // Validation
  // =========================

  const validateEmail = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email";
    }

    setErrors((prev) => ({
      ...prev,
      ...newErrors,
    }));

    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    let newErrors = {};

    if (!formData.otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (formData.otp.length !== 6) {
      newErrors.otp = "OTP must be 6 digits";
    }

    setErrors((prev) => ({
      ...prev,
      ...newErrors,
    }));

    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

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

  // =========================
  // Step 1 - Send OTP
  // =========================
  const handleSendOtp = async () => {
    if (!validateEmail()) return;

    try {
      setLoading((prev) => ({
        ...prev,
        sendOtp: true,
      }));

      // API CALL HERE
      const response = await sendOtpApi(formData.email);

      if (!response.success) {
        setErrors((prev) => ({
          ...prev,
          api: response.message,
        }));

        return;
      }

      setOtpStep(2);

      message.success("OTP sent successfully");
    } catch {
      setErrors((prev) => ({
        ...prev,
        api: "Failed to send OTP",
      }));
    } finally {
      setLoading((prev) => ({
        ...prev,
        sendOtp: false,
      }));
    }
  };

  // =========================
  // Step 2 - Verify OTP
  // =========================
  const handleVerifyOtp = async () => {
    if (!validateOtp()) return;

    try {
      setLoading((prev) => ({
        ...prev,
        verifyOtp: true,
      }));

      // API CALL HERE
      const response = await verifyOtpApi(formData.email, formData.otp);

      if (!response.success) {
        setErrors((prev) => ({
          ...prev,
          api: response.message,
        }));

        return;
      }

      setOtpStep(3);

      message.success("OTP verified");
    } catch {
      setErrors((prev) => ({
        ...prev,
        api: "Invalid OTP",
      }));
    } finally {
      setLoading((prev) => ({
        ...prev,
        verifyOtp: false,
      }));
    }
  };

  // =========================
  // Step 3 - Register
  // =========================
  const handleRegister = async () => {
    if (!validateRegister()) return;

    try {
      setLoading((prev) => ({
        ...prev,
        register: true,
      }));

      // API CALL HERE
      const response = await registerApi({
        email: formData.email,
        name: formData.fullName,
        password: formData.password,
      });

      if (!response.success) {
        setErrors((prev) => ({
          ...prev,
          api: response.message,
        }));

        return;
      }

      setOtpStep(4);

      message.success("Registration successful");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch {
      setErrors((prev) => ({
        ...prev,
        api: "Registration failed",
      }));
    } finally {
      setLoading((prev) => ({
        ...prev,
        register: false,
      }));
    }
  };

  // Step indicator helper
  const steps = [
    { id: 1, label: "Email" },
    { id: 2, label: "Verify" },
    { id: 3, label: "Details" },
  ];

  return (
    <main className="min-h-svh w-full bg-[#0a0a0a] flex justify-center items-center px-4 py-10 relative overflow-hidden">
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
              Create your account
            </h1>
            <p className="text-neutral-500 text-sm mt-1.5">
              Start your focused work journey
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-between gap-2 px-1">
            {steps.map((s, idx) => {
              const reached = otpStep >= s.id || otpStep === 4;
              const isLast = idx === steps.length - 1;
              return (
                <div key={s.id} className="flex items-center flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-semibold transition-colors duration-300 ${
                        reached
                          ? "bg-white text-black"
                          : "bg-white/[0.04] text-neutral-500 border border-white/10"
                      }`}
                    >
                      {s.id}
                    </div>
                    <span
                      className={`text-xs ${
                        reached ? "text-white" : "text-neutral-500"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {!isLast && (
                    <div
                      className={`flex-1 h-px mx-2 transition-colors duration-300 ${
                        otpStep > s.id ? "bg-white" : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              );
            })}
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
              disabled={otpStep >= 3}
              status={errors.email ? "error" : ""}
            />

            {errors.email && (
              <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
            )}
          </div>

          {/* Step 1 */}
          {otpStep === 1 && (
            <Button
              type="primary"
              size="large"
              loading={loading.sendOtp}
              onClick={handleSendOtp}
              className="!h-11 !font-medium"
            >
              Send OTP
            </Button>
          )}

          {/* Step 2 */}
          {otpStep >= 2 && (
            <>
              <div>
                <label className="text-xs font-medium text-neutral-400 mb-1.5 block">
                  Verification Code
                </label>
                <Flex vertical gap={10}>
                  <Input.OTP
                    length={6}
                    size="large"
                    value={formData.otp}
                    onChange={handleOtpChange}
                    disabled={otpStep >= 3}
                  />

                  {errors.otp && (
                    <p className="text-red-400 text-xs">{errors.otp}</p>
                  )}

                  {/* Verify OTP */}
                  {otpStep === 2 && (
                    <Button
                      type="primary"
                      size="large"
                      loading={loading.verifyOtp}
                      onClick={handleVerifyOtp}
                      className="!h-11 !font-medium"
                    >
                      Verify OTP
                    </Button>
                  )}

                  {/* Resend OTP */}
                  {otpStep === 2 && (
                    <Button
                      size="large"
                      loading={loading.sendOtp}
                      onClick={handleSendOtp}
                      className="!h-11"
                    >
                      Resend OTP
                    </Button>
                  )}
                </Flex>
              </div>
            </>
          )}

          {/* Step 3 */}
          {otpStep >= 3 && (
            <>
              <div>
                <label className="text-xs font-medium text-neutral-400 mb-1.5 block">
                  Full Name
                </label>
                <Input
                  placeholder="Jane Doe"
                  size="large"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  status={errors.fullName ? "error" : ""}
                />

                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.fullName}
                  </p>
                )}
              </div>

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
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.password}
                  </p>
                )}
              </div>

              {otpStep !== 4 && (
                <Button
                  type="primary"
                  size="large"
                  loading={loading.register}
                  onClick={handleRegister}
                  className="!h-11 !font-medium"
                >
                  Create account
                </Button>
              )}
            </>
          )}

          {/* Step 4 */}
          {otpStep === 4 && (
            <div className="text-center py-2 px-3 rounded-lg border border-white/10 bg-white/[0.03]">
              <p className="text-white font-medium text-sm m-0">
                ✓ Registration successful — redirecting…
              </p>
            </div>
          )}

          {/* Login */}
          <p className="text-center text-neutral-500 text-sm m-0">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-medium hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
