// src/pages/FocusPage.jsx

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import { Card, message } from "antd";

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

import { toggleTask } from "../features/tasks/taskSlice";

import {
  setSessionStatus,
  setTotalSeconds,
  setTimeLeft,
  decrementTime,
  setIsEditing,
  setEditMinutes,
  setIsBreakMode,
  decrementBreakTime,
  setCompletionModalOpen,
  setBreakModalOpen,
  setCancelModalOpen,
  resetFocusSession,
} from "../features/focus/focusSlice";

const FocusPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { taskId } = useParams();

  // =========================
  // Tasks
  // =========================

  const { tasks } = useSelector((state) => state.tasks);

  const focusTask = tasks.find((task) => String(task.id) === String(taskId));

  // if focusTask not found
  // GET /api/v1/task/:taskId

  // =========================
  // Focus Redux State
  // =========================

  const {
    sessionStatus,

    totalSeconds,
    timeLeft,

    isEditing,
    editMinutes,

    isBreakMode,
    breakTotalSeconds,
    breakTimeLeft,

    completionModalOpen,
    breakModalOpen,
    cancelModalOpen,
  } = useSelector((state) => state.focus);

  // =========================
  // Task
  // =========================

  const task = {
    id: taskId,

    task_name: focusTask?.task_name || "Task Not Found",
  };

  // =========================
  // Title
  // =========================

  useEffect(() => {
    document.title = "Do Focus | Focus Session | " + task.task_name;
  }, [task.task_name]);

  // =========================
  // Focus Timer
  // =========================

  useEffect(() => {
    let interval = null;

    if (sessionStatus === "active" && timeLeft > 0 && !isBreakMode) {
      interval = setInterval(() => {
        if (timeLeft <= 1) {
          clearInterval(interval);

          dispatch(setSessionStatus("paused"));

          dispatch(setCompletionModalOpen(true));

          dispatch(setTimeLeft(0));

          return;
        }

        dispatch(decrementTime());
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [sessionStatus, timeLeft, isBreakMode, dispatch]);

  // =========================
  // Break Timer
  // =========================

  useEffect(() => {
    let interval = null;

    if (isBreakMode && breakTimeLeft > 0) {
      interval = setInterval(() => {
        dispatch(decrementBreakTime());
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isBreakMode, breakTimeLeft, dispatch]);

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

    dispatch(setTotalSeconds(newSeconds));

    dispatch(setTimeLeft(newSeconds));

    dispatch(setIsEditing(false));

    message.success("Timer updated");
  };

  // =========================
  // Start
  // =========================

  const handleStart = () => {
    dispatch(setSessionStatus("active"));

    message.success("Focus session started");
  };

  // =========================
  // Pause
  // =========================

  const handlePause = () => {
    dispatch(setSessionStatus("paused"));

    message.info("Session paused");
  };

  // =========================
  // Resume
  // =========================

  const handleResume = () => {
    dispatch(setSessionStatus("active"));

    message.success("Session resumed");
  };

  // =========================
  // Finish
  // =========================

  const handleFinish = () => {
    // API PLACEHOLDER

    dispatch(setCompletionModalOpen(true));

    dispatch(setSessionStatus("completed"));

    message.success("Task completed");
  };

  // =========================
  // Cancel
  // =========================

  const handleCancel = () => {
    dispatch(setCancelModalOpen(true));
  };

  const handleConfirmCancel = () => {
    // API PLACEHOLDER

    dispatch(setCancelModalOpen(false));

    dispatch(setSessionStatus("cancelled"));

    navigate("/dashboard");

    message.warning("Session cancelled");
  };

  const handleContinueSession = () => {
    dispatch(setCancelModalOpen(false));

    message.info("Session continued");
  };

  // =========================
  // Completion Modal
  // =========================

  const handleTaskCompleted = () => {
    dispatch(setCompletionModalOpen(false));

    dispatch(toggleTask(task.id));

    // API PLACEHOLDER
    // API PLACEHOLDER

    dispatch(setSessionStatus("completed"));

    dispatch(setBreakModalOpen(true));
  };

  const handleTaskNotCompleted = () => {
    dispatch(setCompletionModalOpen(false));

    // API PLACEHOLDER

    dispatch(resetFocusSession());

    message.info("Task restarted");
  };

  // =========================
  // Break Modal
  // =========================

  const handleNextTask = () => {
    dispatch(setBreakModalOpen(false));

    navigate("/dashboard");
  };

  const handleTakeBreak = () => {
    dispatch(setBreakModalOpen(false));

    dispatch(setIsBreakMode(true));

    message.success("Break started");
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex justify-center items-center">
        <Card className="w-full max-w-2xl rounded-3xl shadow-xl">
          {isBreakMode ? (
            <BreakTimer
              breakTimeLeft={breakTimeLeft}
              breakTotalSeconds={breakTotalSeconds}
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
                setEditMinutes={(value) => dispatch(setEditMinutes(value))}
                setIsEditing={(value) => dispatch(setIsEditing(value))}
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
