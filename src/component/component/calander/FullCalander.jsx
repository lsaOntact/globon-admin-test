import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calanderStyle.css";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { useState } from "react";
import { RightArrow, LeftArrow, CheckMark } from "../common";

const FullCalander = () => {
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
    ],
  };

  const renderTile = ({ date, view }) => {
    if (view !== "month") return null;

    const currentDate = dayjs(date).startOf("day");
    const isToday = currentDate.isSame(today, "day");

    const registeredRoutine = getRoutineProgress?.routineDayProgressList?.find(
      (item) => item.date === dayjs(date).format("YYYY-MM-DD")
    );

    // 기본 날짜 스타일
    const baseClass =
      "text-sm w-[50px] h-[50px] flex items-center justify-center";

    // 오늘 날짜
    if (isToday) {
      return (
        <div className="relative w-[40px] flex flex-col justify-center items-center">
          <p className="text-sm flex h-[40px] w-[40px] items-center justify-center rounded-full bg-gray-200">
            {date.getDate()}
          </p>
          <span className="text-sm absolute bottom-[-20px] text-gray-500">
            오늘
          </span>
        </div>
      );
    }

    if (currentDate.isBefore(today) || currentDate.isSame(today, "day")) {
      if (registeredRoutine) {
        const percent =
          registeredRoutine.totalSettingRoutineCount === 0
            ? 0
            : Math.round(
                (registeredRoutine.checkedRoutineCount /
                  registeredRoutine.totalSettingRoutineCount) *
                  100
              );
        // 체크 표시
        if (percent === 100) {
          return (
            <div
              className={twMerge(
                baseClass,
                " h-[40px] w-[40px] rounded-full bg-violet-600"
              )}
            >
              <CheckMark />
            </div>
          );
        } else if (percent === 0) {
          return <div className={twMerge(baseClass, "")}>{date.getDate()}</div>;
        }
      }
      return <div className={twMerge(baseClass, "")}>{date.getDate()}</div>;
    }

    return (
      <div className={twMerge(baseClass, "text-gray-300")}>
        {date.getDate()}
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
        formatDay={() => ""}
        formatMonthYear={(_, date) => dayjs(date).format("YYYY.MM")}
        formatShortWeekday={(_, date) => {
          const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
          return weekdays[date.getDay()];
        }}
        tileContent={renderTile}
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate)
        }
      />
    </div>
  );
};

export default FullCalander;
