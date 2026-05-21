import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../layouts/MainLayout";

import CalendarHeatmapSection from "../components/profile/CalendarHeatmapSection";
import TaskBreakdown from "../components/profile/TaskBreakdown";
import UserDetails from "../components/profile/UserDetails";
import {
  fetchDayDetails,
  fetchProfileData,
  setSelectedDate,
} from "../features/profile/profileSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { user, heatmapData, selectedDate, selectedDayData, loading } =
    useSelector((state) => state.profile);

  const userId = "usr_12345";

  useEffect(() => {
    dispatch(fetchProfileData(userId));
  }, [dispatch]);

  const handleDateClick = (date) => {
    dispatch(setSelectedDate(date));

    dispatch(
      fetchDayDetails({
        userId,
        date,
      }),
    );
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center text-xl">
          Loading Profile...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <UserDetails user={user} />

          <CalendarHeatmapSection
            heatmapData={heatmapData}
            onDateClick={handleDateClick}
          />

          {selectedDate && (
            <div>
              <TaskBreakdown tasks={selectedDayData.tasks} />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
