// src/features/focus/focusSlice.js

import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_MINUTES = 25;

const initialState = {
  // =========================
  // Session
  // =========================

  sessionId: null,

  sessionStatus: "idle",

  /*
    idle
    active
    paused
    completed
    cancelled
  */

  // =========================
  // Timer
  // =========================

  totalSeconds: DEFAULT_MINUTES * 60,

  timeLeft: DEFAULT_MINUTES * 60,

  // =========================
  // Edit Timer
  // =========================

  isEditing: false,

  editMinutes: DEFAULT_MINUTES,

  // =========================
  // Break
  // =========================

  isBreakMode: false,

  breakTotalSeconds: 5 * 60,

  breakTimeLeft: 5 * 60,

  breakEndTime: null,

  // =========================
  // Modals
  // =========================

  completionModalOpen: false,

  breakModalOpen: false,

  cancelModalOpen: false,
};

const focusSlice = createSlice({
  name: "focus",

  initialState,

  reducers: {
    // =========================
    // Session
    // =========================

    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },

    setSessionStatus: (state, action) => {
      state.sessionStatus = action.payload;
    },

    // =========================
    // Timer
    // =========================

    setTotalSeconds: (state, action) => {
      state.totalSeconds = action.payload;
    },

    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },

    decrementTime: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },

    // =========================
    // Edit Timer
    // =========================

    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },

    setEditMinutes: (state, action) => {
      state.editMinutes = action.payload;
    },

    // =========================
    // Break
    // =========================

    setIsBreakMode: (state, action) => {
      state.isBreakMode = action.payload;
    },

    setBreakTimeLeft: (state, action) => {
      state.breakTimeLeft = action.payload;
    },

    setBreakEndTime: (state, action) => {
      state.breakEndTime = action.payload;
    },

    // =========================
    // Modals
    // =========================

    setCompletionModalOpen: (state, action) => {
      state.completionModalOpen = action.payload;
    },

    setBreakModalOpen: (state, action) => {
      state.breakModalOpen = action.payload;
    },

    setCancelModalOpen: (state, action) => {
      state.cancelModalOpen = action.payload;
    },

    // =========================
    // Reset Session
    // =========================

    resetFocusSession: (state) => {
      state.sessionId = null;

      state.sessionStatus = "idle";

      state.totalSeconds = DEFAULT_MINUTES * 60;

      state.timeLeft = DEFAULT_MINUTES * 60;

      state.isEditing = false;

      state.editMinutes = DEFAULT_MINUTES;

      state.isBreakMode = false;

      state.breakTimeLeft = 5 * 60;

      state.breakEndTime = null;

      state.completionModalOpen = false;

      state.breakModalOpen = false;

      state.cancelModalOpen = false;
    },
  },
});

export const {
  // Session
  setSessionId,
  setSessionStatus,

  // Timer
  setTotalSeconds,
  setTimeLeft,
  decrementTime,

  // Edit Timer
  setIsEditing,
  setEditMinutes,

  // Break
  setIsBreakMode,
  setBreakTimeLeft,
  setBreakEndTime,

  // Modals
  setCompletionModalOpen,
  setBreakModalOpen,
  setCancelModalOpen,

  // Reset
  resetFocusSession,
} = focusSlice.actions;

export default focusSlice.reducer;
