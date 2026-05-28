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

  heatmapData?.forEach((item) => {
    heatmapMap[item.date] = item.count;
  });

  const getColor = (count) => {
    if (!count) return "bg-white/[0.04] border-white/[0.04]";

    if (count <= 1200) {
      return "bg-neutral-700 border-neutral-700";
    }

    if (count <= 2400) {
      return "bg-neutral-500 border-neutral-500";
    }

    if (count <= 3600) {
      return "bg-neutral-300 border-neutral-300";
    }

    return "bg-white border-white";
  };

  return (
    <div className="bg-[#111111] p-6 sm:p-7 rounded-2xl border border-white/[0.08] fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-medium m-0">
            Activity
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight m-0 mt-1">
            Calendar Heatmap
          </h2>
        </div>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="
            border border-white/10
            bg-white/[0.03]
            rounded-lg
            px-3 py-2
            text-neutral-200 text-sm
            outline-none
            hover:bg-white/[0.06] hover:border-white/20
            focus:border-white/40
            transition-colors duration-200
            cursor-pointer
          "
        >
          {yearsArray.map((year) => (
            <option
              key={year}
              value={year}
              className="bg-[#111111] text-neutral-200"
            >
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Months */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-3 overflow-x-auto">
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
              <p className="text-xs font-medium text-neutral-500 mb-3">
                {month}
              </p>

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
                        .padStart(2, "0")}M:${(count % 60)
                        .toString()
                        .padStart(2, "0")}S`}
                      className={`
                        w-3 h-3 rounded-[3px] cursor-pointer border
                        transition-all duration-200
                        hover:scale-125 hover:ring-1 hover:ring-white/30
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

      {/* Legend */}
      <div className="mt-6 flex items-center gap-2 text-[11px] text-neutral-500">
        <span>Less</span>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-[3px] bg-white/[0.04] border border-white/[0.04]" />
          <div className="w-3 h-3 rounded-[3px] bg-neutral-700" />
          <div className="w-3 h-3 rounded-[3px] bg-neutral-500" />
          <div className="w-3 h-3 rounded-[3px] bg-neutral-300" />
          <div className="w-3 h-3 rounded-[3px] bg-white" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default CalendarHeatmapSection;
