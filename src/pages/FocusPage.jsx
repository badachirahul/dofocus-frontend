// src/pages/FocusPage.jsx

import { useEffect, useState } from "react";

import { Card, message } from "antd";

import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import FocusHeader from "../components/focus/FocusHeader";
import FocusStatus from "../components/focus/FocusStatus";
import FocusTimer from "../components/focus/FocusTimer";
import TimerEditor from "../components/focus/TimerEditor";
import FocusControls from "../components/focus/FocusControls";
import CompletionModal from "../components/focus/CompletionModal";
import BreakModal from "../components/focus/BreakModal";
import BreakTimer from "../components/focus/BreakTimer";
import CancelSessionModal from "../components/focus/CancelSessionModal";

const FocusPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Do Focus | Focus Session";
  }, []);

  // =========================
  // Demo Task
  // =========================

  const task = {
    id: 1,
    task_name: "Study DBMS",
  };

  // =========================
  // Timer States
  // =========================

  const DEFAULT_MINUTES = 1;

  const [totalSeconds, setTotalSeconds] = useState(DEFAULT_MINUTES * 60);

  const [timeLeft, setTimeLeft] = useState(DEFAULT_MINUTES * 60);

  const [sessionStatus, setSessionStatus] = useState("idle");

  // =========================
  // Edit States
  // =========================

  const [isEditing, setIsEditing] = useState(false);

  const [editMinutes, setEditMinutes] = useState(DEFAULT_MINUTES);

  // =========================
  // Modal States
  // =========================

  const [completionModalOpen, setCompletionModalOpen] = useState(false);

  const [breakModalOpen, setBreakModalOpen] = useState(false);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  // =========================
  // Break States
  // =========================

  const BREAK_TOTAL_SECONDS = 5 * 60;

  const [isBreakMode, setIsBreakMode] = useState(false);

  const [breakTimeLeft, setBreakTimeLeft] = useState(BREAK_TOTAL_SECONDS);

  // =========================
  // Timer Logic
  // =========================

  useEffect(() => {
    let interval = null;

    if (sessionStatus === "active" && timeLeft > 0 && !isBreakMode) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);

            setSessionStatus("paused");

            setCompletionModalOpen(true);

            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [sessionStatus, isBreakMode]);

  // =========================
  // Break Timer
  // =========================

  useEffect(() => {
    let interval = null;

    if (isBreakMode && breakTimeLeft > 0) {
      interval = setInterval(() => {
        setBreakTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isBreakMode, breakTimeLeft]);

  // =========================
  // Formatter
  // =========================

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // =========================
  // Save Timer
  // =========================

  const handleSaveTimer = () => {
    const newSeconds = editMinutes * 60;

    setTotalSeconds(newSeconds);

    setTimeLeft(newSeconds);

    setIsEditing(false);

    message.success("Timer updated");
  };

  // =========================
  // Start
  // =========================

  const handleStart = () => {
    setSessionStatus("active");

    message.success("Focus session started");
  };

  // =========================
  // Pause
  // =========================

  const handlePause = () => {
    setSessionStatus("paused");

    message.info("Session paused");
  };

  // =========================
  // Resume
  // =========================

  const handleResume = () => {
    setSessionStatus("active");

    message.success("Session resumed");
  };

  // =========================
  // Finish
  // =========================

  const handleFinish = () => {
    // API PLACEHOLDER
    setCompletionModalOpen(true);
    
    setSessionStatus("completed");

    message.success("Task completed");
  };

  // =========================
  // Cancel
  // =========================

  const handleCancel = () => {
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = () => {
    // API PLACEHOLDER

    setCancelModalOpen(false);

    setSessionStatus("cancelled");

    navigate("/dashboard");

    message.warning("Session cancelled");
  };

  const handleContinueSession = () => {
    setCancelModalOpen(false);

    message.info("Session continued");
  };

  // =========================
  // Completion Modal
  // =========================

  const handleTaskCompleted = () => {
    setCompletionModalOpen(false);

    // API PLACEHOLDER
    // API PLACEHOLDER

    setSessionStatus("completed");

    setBreakModalOpen(true);
  };

  const handleTaskNotCompleted = () => {
    setCompletionModalOpen(false);

    // API PLACEHOLDER

    // Reset Everything
    setSessionStatus("idle");

    setTotalSeconds(DEFAULT_MINUTES * 60);

    setTimeLeft(DEFAULT_MINUTES * 60);

    setEditMinutes(DEFAULT_MINUTES);

    setIsEditing(false);

    message.info("Task restarted");
  };

  // =========================
  // Break Modal
  // =========================

  const handleNextTask = () => {
    setBreakModalOpen(false);

    navigate("/dashboard");
  };

  const handleTakeBreak = () => {
    setBreakModalOpen(false);

    setIsBreakMode(true);

    message.success("Break started");
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex justify-center items-center">
        <Card className="w-full max-w-2xl rounded-3xl shadow-xl">
          {isBreakMode ? (
            <BreakTimer
              breakTimeLeft={breakTimeLeft}
              breakTotalSeconds={BREAK_TOTAL_SECONDS}
              formatTime={formatTime}
            />
          ) : (
            <>
              {/* Header */}
              <FocusHeader taskName={task.task_name} />

              {/* Status */}
              <FocusStatus sessionStatus={sessionStatus} />

              {/* Timer */}
              <FocusTimer
                timeLeft={timeLeft}
                totalSeconds={totalSeconds}
                formatTime={formatTime}
              />

              {/* Timer Editor */}
              <TimerEditor
                isEditing={isEditing}
                editMinutes={editMinutes}
                setEditMinutes={setEditMinutes}
                setIsEditing={setIsEditing}
                handleSaveTimer={handleSaveTimer}
                sessionStatus={sessionStatus}
              />

              {/* Controls */}
              <FocusControls
                sessionStatus={sessionStatus}
                handleStart={handleStart}
                handlePause={handlePause}
                handleResume={handleResume}
                handleFinish={handleFinish}
                handleCancel={handleCancel}
              />
            </>
          )}
        </Card>

        {/* Completion Modal */}
        <CompletionModal
          open={completionModalOpen}
          handleTaskCompleted={handleTaskCompleted}
          handleTaskNotCompleted={handleTaskNotCompleted}
        />

        {/* Break Modal */}
        <BreakModal
          open={breakModalOpen}
          handleNextTask={handleNextTask}
          handleTakeBreak={handleTakeBreak}
        />

        {/* Cancel Modal */}
        <CancelSessionModal
          open={cancelModalOpen}
          handleConfirmCancel={handleConfirmCancel}
          handleContinueSession={handleContinueSession}
        />
      </div>
    </MainLayout>
  );
};

export default FocusPage;
