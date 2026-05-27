import { useEffect, useState, useRef } from "react";
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
import RestartTaskModal from "../components/focus/RestartTaskModal";
import BreakModal from "../components/focus/BreakModal";
import BreakTimer from "../components/focus/BreakTimer";
import CancelSessionModal from "../components/focus/CancelSessionModal";

import { toggleTask } from "../features/tasks/taskSlice";
import { getSingleTaskApi } from "../features/tasks/taskApi";
import { playAlarm, stopAlarm } from "../utils/audioUtils";
import alarmSound from "../assets/sounds/alarm1.mp3";

import {
  setSessionId,
  setSessionStatus,
  setTotalSeconds,
  setTimeLeft,
  setEndTime,
  decrementTime,
  setIsEditing,
  setEditMinutes,
  setIsBreakMode,
  setBreakEndTime,
  setBreakTimeLeft,
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
import { updateTaskApi } from "../features/tasks/taskApi";

const FocusPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { taskId } = useParams();
  useEffect(() => {
    dispatch(resetFocusSession());
    if (focusTask?.id == taskId && focusTask.completed) {
      alert("This Task is finished");
      navigate("/dashboard");
    }
  }, []);

  // alarm
  const alarmAudio = useRef(new Audio(alarmSound));
  // =========================
  // Tasks
  // =========================

  const { tasks } = useSelector((state) => state.tasks);
  const focusTask = tasks.find((task) => String(task.id) === String(taskId));
  const [taskName, setTaskName] = useState(null);
  const [restartModalOpen, setRestartModalOpen] = useState(false);
  // if (focusTask?.id == taskId && focusTask.completed) {
  //   alert("This Task is finished");
  //   navigate("/dashboard");
  // }
  // =========================
  // Focus Redux State
  // =========================

  const {
    sessionId,
    sessionStatus,
    totalSeconds,
    timeLeft,
    endTime,
    isEditing,
    editMinutes,
    isBreakMode,
    breakEndTime,
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
    task_name: focusTask?.task_name || taskName || "Task Not Found",
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
      const getSingleTask = await getSingleTaskApi(taskId);
      if (getSingleTask.success) {
        setTaskName(getSingleTask.data.task.task_name);
        if (getSingleTask.data.task.completed) {
          alert("This Task is finished, getApi");
          navigate("/dashboard");
        }
      }

      const response = await getCurrentSessionApi(taskId);

      if (!response.success || !response.data?.data) {
        return;
      }

      const session = response.data.data;
      dispatch(setSessionId(session.session_id));
      dispatch(setSessionStatus(session.status));
      dispatch(setTotalSeconds(session.timer_duration_seconds));
      const remaining =
      session.timer_duration_seconds - session.focused_seconds;

      dispatch(setTimeLeft(remaining));

      dispatch(setEndTime(Date.now() + remaining * 1000));
    };

    restoreSession();
  }, [taskId, dispatch]);

  // =========================
  // Focus Timer
  // =========================

  useEffect(() => {
    let interval = null;

    if (sessionStatus === "active" && endTime && !isBreakMode) {
      interval = setInterval(() => {
        const remaining = Math.max(
          0,
          Math.floor((endTime - Date.now()) / 1000),
        );

        dispatch(setTimeLeft(remaining));

        if (remaining <= 0) {
          clearInterval(interval);

          playAlarm(alarmAudio.current);

          dispatch(setSessionStatus("paused"));

          dispatch(setCompletionModalOpen(true));

          dispatch(setTimeLeft(0));
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [sessionStatus, endTime, isBreakMode, dispatch]);

  // =========================
  // Break Timer
  // =========================

  // useEffect(() => {
  //   let interval = null;

  //   if (isBreakMode && breakTimeLeft > 0) {
  //     interval = setInterval(() => {
  //       dispatch(decrementBreakTime());
  //     }, 1000);
  //   }

  //   // Break completed
  //   if (isBreakMode && breakTimeLeft <= 0) {
  //     message.success("Break completed");
  //     dispatch(resetFocusSession());
  //     setTimeout(() => {
  //       navigate("/dashboard");
  //     }, 1000);
  //   }

  //   return () => clearInterval(interval);
  // }, [isBreakMode, breakTimeLeft, dispatch, navigate]);

  useEffect(() => {
    let interval = null;

    if (isBreakMode && breakEndTime) {
      interval = setInterval(() => {
        const remaining = Math.max(
          0,
          Math.floor((breakEndTime - Date.now()) / 1000),
        );

        dispatch(setBreakTimeLeft(remaining));

        if (remaining <= 0) {
          clearInterval(interval);

          playAlarm(alarmAudio.current);

          message.success("Break completed");

          dispatch(resetFocusSession());

          setTimeout(() => {
            stopAlarm(alarmAudio.current);
            navigate("/dashboard");
          }, 7000);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isBreakMode, breakEndTime, dispatch, navigate]);
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

    dispatch(setSessionId(response.data.session.session_id));
    dispatch(setSessionStatus("active"));
    dispatch(setEndTime(Date.now() + totalSeconds * 1000));
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
    dispatch(setEndTime(Date.now() + timeLeft * 1000));
    message.success("Session resumed");
  };

  // =========================
  // Finish
  // =========================

  const handleFinish = () => {
    // dispatch(setCompletionModalOpen(true));
    handleTaskCompleted();
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
    dispatch(resetFocusSession());
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

    stopAlarm(alarmAudio.current);

    const response = await finishFocusSessionApi(sessionId);

    if (!response.success) {
      message.error(response.message);
      return;
    }
    const TaskCompletedResponse = await updateTaskApi(task.id, {
      task_name: task.task_name,
      completed: true,
    });

    if (!TaskCompletedResponse.success) {
      message.error(TaskCompletedResponse.message);
      return;
    }
    dispatch(toggleTask(task.id));
    dispatch(setSessionStatus("completed"));
    dispatch(resetFocusSession());
    dispatch(setBreakModalOpen(true));
  };

  const handleTaskNotCompleted = async () => {
    dispatch(setCompletionModalOpen(false));

    stopAlarm(alarmAudio.current);

    const response = await finishFocusSessionApi(sessionId);

    if (!response.success) {
      message.error(response.message);
      return;
    }

    setRestartModalOpen(true);
  };

  const handleRestartTask = () => {
    setRestartModalOpen(false);

    dispatch(resetFocusSession());

    message.info("Task restarted");
  };

  const handleBreakAfterIncompleteTask = () => {
    setRestartModalOpen(false);

    dispatch(setIsBreakMode(true));

    dispatch(setBreakEndTime(Date.now() + 5 * 60 * 1000));

    message.success("Break started");
  };

  // =========================
  // Break Modal
  // =========================

  const handleNextTask = () => {
    dispatch(setBreakModalOpen(false));
    navigate("/dashboard");
  };

  // const handleTakeBreak = () => {
  //   dispatch(setBreakModalOpen(false));
  //   dispatch(setIsBreakMode(true));
  //   message.success("Break started");
  // };
  const handleTakeBreak = () => {
    
    dispatch(setBreakModalOpen(false));

    dispatch(setIsBreakMode(true));

    dispatch(setBreakEndTime(Date.now() + 5 * 60 * 1000));

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
        {/* Restart Modal */}
        <RestartTaskModal
          open={restartModalOpen}
          handleRestartTask={handleRestartTask}
          handleBreak={handleBreakAfterIncompleteTask}
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
