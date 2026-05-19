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

  return (
    <main className="h-svh w-full bg-[#f0f0f0] flex justify-center items-center px-4">
      <section className="w-full max-w-md shadow-2xl bg-white p-6 rounded-2xl flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-center">Register</h1>

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
            disabled={otpStep >= 3}
            status={errors.email ? "error" : ""}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Step 1 */}
        {otpStep === 1 && (
          <Button
            type="primary"
            size="large"
            loading={loading.sendOtp}
            onClick={handleSendOtp}
          >
            Send OTP
          </Button>
        )}

        {/* Step 2 */}
        {otpStep >= 2 && (
          <>
            <div>
              <Flex vertical gap={10}>
                <Input.OTP
                  length={6}
                  size="large"
                  value={formData.otp}
                  onChange={handleOtpChange}
                  disabled={otpStep >= 3}
                />

                {errors.otp && (
                  <p className="text-red-500 text-sm">{errors.otp}</p>
                )}

                {/* Verify OTP */}
                {otpStep === 2 && (
                  <Button
                    color="cyan"
                    variant="solid"
                    size="large"
                    loading={loading.verifyOtp}
                    onClick={handleVerifyOtp}
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
              <Input
                placeholder="Full Name"
                size="large"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                status={errors.fullName ? "error" : ""}
              />

              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

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

            {otpStep !== 4 && (
              <Button
                type="primary"
                size="large"
                loading={loading.register}
                onClick={handleRegister}
              >
                Register
              </Button>
            )}
          </>
        )}

        {/* Step 4 */}
        {otpStep === 4 && (
          <div className="text-center">
            <p className="text-green-600 font-semibold text-lg">
              ✅ Registration Successful
            </p>
          </div>
        )}

        {/* Login */}
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
