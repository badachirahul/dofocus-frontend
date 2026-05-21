import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDayDetails, getProfileData } from "./profileApi";

export const fetchProfileData = createAsyncThunk(
  "profile/fetchProfileData",
  async (userId) => {
    return await getProfileData(userId);
  },
);

export const fetchDayDetails = createAsyncThunk(
  "profile/fetchDayDetails",
  async ({ userId, date }) => {
    return await getDayDetails(userId, date);
  },
);

const initialState = {
  user: null,
  heatmapData: [],
  selectedDate: null,
  selectedDayData: {
    hourlyFocus: [],
    tasks: [],
  },
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.heatmapData = action.payload.heatmapData;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDayDetails.fulfilled, (state, action) => {
        state.selectedDayData = action.payload;
      });
  },
});

export const { setSelectedDate } = profileSlice.actions;

export default profileSlice.reducer;
