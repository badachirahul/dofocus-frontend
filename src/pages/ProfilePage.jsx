import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../layouts/MainLayout";

import UserDetails from "../components/profile/UserDetails";
import CalendarHeatmapSection from "../components/profile/CalendarHeatmapSection";
import TaskBreakdown from "../components/profile/TaskBreakdown";

import {
  fetchDayDetails,
  fetchProfileData,
  setSelectedDate,
} from "../features/profile/profileSlice";

import { getUserId } from "../utils/localStorage";

const ProfilePage = () => {
  useEffect(() => {
    document.title = "Do Focus | Profile";
  }, []);
  const dispatch = useDispatch();

  const { user, heatmapData, selectedDate, selectedDayData, loading, error } =
    useSelector((state) => state.profile);

  const userId = getUserId();

  // Fetch Profile Data
  useEffect(() => {
    if (userId) {
      dispatch(fetchProfileData(userId));
      let date = new Date().toISOString().split("T")[0];
      dispatch(setSelectedDate(date));
      dispatch(
        fetchDayDetails({
          userId,
          date,
        }),
      );
    }
  }, [dispatch, userId]);

  // Handle Day Click
  const handleDateClick = (date) => {
    dispatch(setSelectedDate(date));

    dispatch(
      fetchDayDetails({
        userId,
        date,
      }),
    );
  };

  // Loading State
  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <div className="h-10 w-10 rounded-full border-2 border-white/10 border-t-white animate-spin" />
          <p className="text-neutral-400 text-sm m-0">Loading profile…</p>
        </div>
      </MainLayout>
    );
  }

  // Error State
  if (error) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center px-6 py-8 rounded-2xl border border-red-500/20 bg-red-500/[0.04]">
            <p className="text-red-300 text-base m-0">{error}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Format selected date as readable label
  const prettyDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* User Details */}
        <UserDetails user={user} />

        {/* Heatmap */}
        <CalendarHeatmapSection
          heatmapData={heatmapData}
          onDateClick={handleDateClick}
          userFromYear={user?.year}
        />

        {/* Selected Day */}
        {selectedDate && (
          <div className="bg-[#111111] rounded-2xl border border-white/[0.08] p-6 sm:p-7 fade-in-up">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-medium m-0">
                  Selected day
                </p>
                <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight m-0 mt-1">
                  {prettyDate}
                </h2>
              </div>
              <span className="text-xs text-neutral-500 font-mono px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03]">
                {selectedDate}
              </span>
            </div>

            {/* Task Breakdown */}
            <TaskBreakdown tasks={selectedDayData.tasks} />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
