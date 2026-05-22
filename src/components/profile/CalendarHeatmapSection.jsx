import { useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
} from "date-fns";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CalendarHeatmapSection = ({ heatmapData, onDateClick, userFromYear }) => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const yearsArray = Array.from(
    { length: currentYear - userFromYear + 1 },
    (_, index) => userFromYear + index,
  );
  const heatmapMap = {};

  heatmapData.forEach((item) => {
    heatmapMap[item.date] = item.count;
  });

  const getColor = (count) => {
    if (!count) return "bg-gray-200";

    if (count < 1800) {
      return "bg-green-200";
    }

    if (count < 3600) {
      return "bg-green-400";
    }

    return "bg-green-600";
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm ">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Calendar Heatmap
        </h2>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="
            border border-gray-300
            rounded-lg
            px-3 py-2
            text-gray-700
            outline-none
          "
        >
          {yearsArray.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Months */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-3">
        {MONTHS.map((month, monthIndex) => {
          const start = startOfMonth(new Date(year, monthIndex));

          const end = endOfMonth(start);

          const days = eachDayOfInterval({
            start,
            end,
          });

          const padding = getDay(start);

          return (
            <div key={monthIndex}>
              <p className="text-sm font-medium text-gray-500 mb-3">{month}</p>

              <div className="grid grid-flow-col grid-rows-7 gap-1">
                {/* Empty spaces */}
                {Array.from({
                  length: padding,
                }).map((_, index) => (
                  <div key={index} className="w-3 h-3" />
                ))}

                {/* Days */}
                {days.map((day) => {
                  const date = format(day, "yyyy-MM-dd");

                  const count = heatmapMap[date] || 0;

                  return (
                    <div
                      key={date}
                      onClick={() => onDateClick(date)}
                      title={`${date} • ${Math.floor(count / 3600)}H:${Math.floor(
                        (count % 3600) / 60,
                      )
                        .toString()
                        .padStart(
                          2,
                          "0",
                        )}M:${(count % 60).toString().padStart(2, "0")}S`}
                      className={`
                        w-3 h-3 rounded-sm cursor-pointer
                        transition-all duration-200
                        hover:scale-125
                        ${getColor(count)}
                      `}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarHeatmapSection;
