// src/features/focus/focusSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSession: null,
  focusHistory: [],
};

const focusSlice = createSlice({
  name: "focus",

  initialState,

  reducers: {
    // Start Session
    startFocusSession: (
      state,
      action
    ) => {
      state.currentSession =
        action.payload;
    },

    // End Session
    endFocusSession: (state) => {
      if (state.currentSession) {
        state.focusHistory.unshift(
          state.currentSession
        );
      }

      state.currentSession = null;
    },

    // Set History
    setFocusHistory: (
      state,
      action
    ) => {
      state.focusHistory =
        action.payload;
    },
  },
});

export const {
  startFocusSession,
  endFocusSession,
  setFocusHistory,
} = focusSlice.actions;

export default focusSlice.reducer;