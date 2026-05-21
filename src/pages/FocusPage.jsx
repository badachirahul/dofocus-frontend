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
  setSessionId,
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

import {
  startFocusSessionApi,
  pauseFocusSessionApi,
  resumeFocusSessionApi,
  finishFocusSessionApi,
  cancelFocusSessionApi,
  getCurrentSessionApi,
} from "../features/focus/focusApi";

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
    sessionId,
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
  // Restore Session
  // =========================

  useEffect(() => {
    const restoreSession = async () => {
      const response = await getCurrentSessionApi(taskId);

      if (!response.success || !response.data?.data) {
        return;
      }

      const session = response.data.data;
      dispatch(setSessionId(session.session_id));
      dispatch(setSessionStatus(session.status));
      dispatch(setTotalSeconds(session.timer_duration_seconds));
      dispatch(
        setTimeLeft(session.timer_duration_seconds - session.focused_seconds),
      );
    };

    restoreSession();
  }, [taskId, dispatch]);

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

  const handleStart = async () => {
    const response = await startFocusSessionApi({
      task_id: task.id,

      timer_duration_seconds: totalSeconds,
    });
    if (!response.success) {
      message.error(response.message);
      return;
    }

    dispatch(setSessionId(response.data.data.session_id));
    dispatch(setSessionStatus("active"));
    message.success("Focus session started");
  };

  // =========================
  // Pause
  // =========================

  const handlePause = async () => {
    const response = await pauseFocusSessionApi(sessionId);

    if (!response.success) {
      message.error(response.message);
      return;
    }
    dispatch(setSessionStatus("paused"));
    message.info("Session paused");
  };

  // =========================
  // Resume
  // =========================

  const handleResume = async () => {
    const response = await resumeFocusSessionApi(sessionId);

    if (!response.success) {
      message.error(response.message);
      return;
    }

    dispatch(setSessionStatus("active"));
    message.success("Session resumed");
  };

  // =========================
  // Finish
  // =========================

  const handleFinish = () => {
    dispatch(setCompletionModalOpen(true));
    dispatch(setSessionStatus("paused"));
  };

  // =========================
  // Cancel
  // =========================

  const handleCancel = () => {
    dispatch(setCancelModalOpen(true));
  };

  const handleConfirmCancel = async () => {
    const response = await cancelFocusSessionApi(sessionId);

    if (!response.success) {
      message.error(response.message);
      return;
    }

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

  const handleTaskCompleted = async () => {
    dispatch(setCompletionModalOpen(false));

    const response = await finishFocusSessionApi(sessionId);

    if (!response.success) {
      message.error(response.message);
      return;
    }

    dispatch(toggleTask(task.id));
    dispatch(setSessionStatus("completed"));
    dispatch(setBreakModalOpen(true));
  };

  const handleTaskNotCompleted = () => {
    dispatch(setCompletionModalOpen(false));
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
