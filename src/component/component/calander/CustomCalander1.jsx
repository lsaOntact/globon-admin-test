import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calanderStyle.css";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { useState } from "react";
import { RightArrow, LeftArrow } from "../common/common";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CustomCalander1 = () => {
  const today = new Date();
  const [activeStartDate, setActiveStartDate] = useState(today);

  const getRoutineProgress = {
    routineDayProgressList: [
      {
        date: "2026-01-03",
        totalSettingRoutineCount: 5,
        checkedRoutineCount: 5,
      },
      {
        date: "2026-01-05",
        totalSettingRoutineCount: 5,
        checkedRoutineCount: 5,
      },
      {
        date: "2026-01-06",
        totalSettingRoutineCount: 5,
        checkedRoutineCount: 3,
      },
      {
        date: "2026-01-07",
        totalSettingRoutineCount: 5,
        checkedRoutineCount: 0,
      },
      {
        date: "2026-01-08",
        totalSettingRoutineCount: 5,
        checkedRoutineCount: 2,
      },
      {
        date: "2026-01-09",
        totalSettingRoutineCount: 5,
        checkedRoutineCount: 1,
      },
    ],
  };

  const renderTile = ({ date, view }) => {
    if (view !== "month") return null;

    const currentDate = dayjs(date).startOf("day");
    const isToday = currentDate.isSame(today, "day");
    const isFutureDate = currentDate.isAfter(today, "day");

    const registeredRoutine = getRoutineProgress?.routineDayProgressList?.find(
      (item) => item.date === dayjs(date).format("YYYY-MM-DD")
    );

    const percent =
      registeredRoutine?.totalSettingRoutineCount === 0
        ? 0
        : Math.round(
            ((registeredRoutine?.checkedRoutineCount || 0) /
              (registeredRoutine?.totalSettingRoutineCount || 1)) *
              100
          );

    const isSelectable = !isFutureDate;

    return (
      <div className="relative">
        <CircularProgressbarWithChildren
          backgroundPadding={0}
          value={percent}
          styles={{
            root: {
              width: "36px",
              height: "36px",
            },
            path: {
              stroke: isSelectable ? "#6157DC" : "transparent",
              strokeWidth: 8,
            },
            trail: {
              stroke: isSelectable ? "#F1F1F1" : "transparent",
            },
          }}
          className={twMerge("relative z-10")}
        >
          <div
            className={twMerge(
              "absolute inset-0 flex items-center justify-center rounded-full",
              isToday ? "bg-gray-200" : "",
              isSelectable ? "text-gray-900" : "text-gray-300"
            )}
          >
            {date.getDate()}
          </div>
        </CircularProgressbarWithChildren>
        <div className="text-sm h-[17px]">
          {isToday && <p className="text-gray-500">오늘</p>}
        </div>
      </div>
    );
  };

  return (
    <div className="w-[500px] h-[500px]">
      <Calendar
        className="custom-routine-calendar"
        calendarType="gregory"
        prev2Label={null}
        next2Label={null}
        prevLabel={<LeftArrow />}
        nextLabel={
          <RightArrow
            fillColor={
              dayjs(activeStartDate).isSame(dayjs(today), "month")
                ? "#DCDCDC"
                : undefined
            }
          />
        }
        maxDate={new Date()}
        showNeighboringMonth={false}
        formatDay={(_, date) => ""}
        formatMonthYear={(_, date) => dayjs(date).format("YYYY.MM")}
        tileContent={renderTile}
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate)
        }
      />
    </div>
  );
};

export default CustomCalander1;
