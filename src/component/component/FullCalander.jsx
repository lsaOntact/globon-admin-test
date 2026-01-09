import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calanderStyle.css";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { useState } from "react";
import "react-circular-progressbar/dist/styles.css";

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

  const LeftArrow = ({ fillColor = "#8F8F8F" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        d="M5.3 9.58407C4.23333 8.88004 4.23333 7.11996 5.3 6.415933L10.1 3.24778C11.1667 2.54375 12.5 3.42379 12.5 4.83186V11.1681C12.5 12.5762 11.1667 13.4562 10.1 12.7522L5.3 9.58407Z"
        fill={fillColor}
      />
    </svg>
  );

  const RightArrow = ({ fillColor = "#8F8F8F" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        d="M11.7 9.58407C12.7667 8.88004 12.7667 7.11996 11.7 6.415933L6.9 3.24778C5.83333 2.54375 4.5 3.42379 4.5 4.83186V11.1681C4.5 12.5762 5.83333 13.4562 6.9 12.7522L11.7 9.58407Z"
        fill={fillColor}
      />
    </svg>
  );

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
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                  fill="white"
                />
              </svg>
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
