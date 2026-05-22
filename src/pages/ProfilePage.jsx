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
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-600">
            Loading Profile...
          </h1>
        </div>
      </MainLayout>
    );
  }

  // Error State
  if (error) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-xl text-red-500">{error}</h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#f8f9fb] p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
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
            <div className="space-y-6">
              {/* Selected Date Title */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {selectedDate}
                </h2>


              {/* Task Breakdown */}
              <TaskBreakdown tasks={selectedDayData.tasks} />
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
