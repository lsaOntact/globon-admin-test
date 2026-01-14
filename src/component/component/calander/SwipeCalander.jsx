import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const SwipeCalander = () => {
  const today = new Date();
  const todayTime = today.getTime();
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const [selectedDate, setSelectedDate] = useState(today);
  const swiperRef = useRef(null);

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

  // 헬퍼 함수들
  const isToday = (date) => {
    return dayjs(date).isSame(dayjs(today), "day");
  };

  const isSameDate = (date1, date2) => {
    return date1.isSame(date2, "day");
  };

  const getStartOfWeek = (date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay()); // 일요일
    start.setHours(0, 0, 0, 0);
    return start;
  };

  const getWeekDates = (startOfWeek) =>
    Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  // 주 단위로 날짜 생성 (이번 달 기준)
  const generateWeeksFromToday = (range = 20) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간 제거
    const todayWeekStart = getStartOfWeek(today);

    // 이전 20주부터 오늘이 포함된 주까지 (총 21주)
    return Array.from({ length: range + 1 }, (_, i) => {
      const offset = i - range; // -20부터 0까지
      const weekStart = new Date(todayWeekStart);
      weekStart.setDate(todayWeekStart.getDate() + offset * 7);

      return getWeekDates(weekStart);
    });
  };

  const weeks = generateWeeksFromToday();

  // 현재 주 찾기
  const findCurrentWeekIndex = () => {
    return weeks.findIndex((week) =>
      week.some((day) => dayjs(day).isSame(dayjs(today), "day"))
    );
  };

  const onWeekChanged = (week) => {
    // console.log("Week changed:", week);
  };

  return (
    <div className="w-[500px] h-[150px]">
      <div className="flex">
        {weekDays.map((day, index) => (
          <div
            key={day + index}
            className="text-sm flex h-[40px] flex-1 items-center justify-center text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>
      <Swiper
        speed={600}
        slidesPerView={1}
        slidesPerGroup={1}
        initialSlide={findCurrentWeekIndex()}
        className="w-full"
        onSlideChange={(swiper) => {
          const newIndex = swiper.activeIndex;
          const currentWeek = weeks[newIndex];
          onWeekChanged(currentWeek);
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {weeks.map((week, i) => (
          <SwiperSlide key={i} className="w-full">
            <div className="flex">
              {week.map((day, idx) => {
                const dateTime = day.getTime();
                const isSelectable = dateTime <= todayTime;

                const isTodayDate = isToday(day);
                const isSelectedDate = isSameDate(
                  dayjs(day),
                  dayjs(selectedDate)
                );

                const dateInfo =
                  getRoutineProgress.routineDayProgressList?.find(
                    (item) => item.date === dayjs(day).format("YYYY-MM-DD")
                  );
                const percent = dateInfo
                  ? dateInfo?.totalSettingRoutineCount === 0
                    ? 0
                    : Math.round(
                        (dateInfo?.checkedRoutineCount /
                          dateInfo?.totalSettingRoutineCount) *
                          100
                      )
                  : 0;

                return (
                  <div
                    key={`${i}-${idx}`}
                    onPointerDown={(e) => {
                      // 포인터 이벤트로 처리하여 터치와 마우스 모두 대응
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();

                      if (isSelectable) {
                        setSelectedDate(day);
                      }
                    }}
                    className="relative flex flex-1 flex-col items-center justify-center gap-1"
                  >
                    <div className="relative">
                      <CircularProgressbarWithChildren
                        backgroundPadding={0}
                        value={percent}
                        styles={{
                          root: {
                            width: "36px", // 명시적 크기 설정
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
                            isTodayDate ? "bg-gray-200" : "",
                            isSelectedDate && !isTodayDate
                              ? "bg-violet-200"
                              : "",
                            isSelectable ? "text-gray-900" : "text-gray-300"
                          )}
                        >
                          {day.getDate()}
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>

                    <div className="text-sm h-[17px]">
                      {isTodayDate && <p className="text-gray-500">오늘</p>}
                      {isSelectedDate && !isTodayDate && (
                        <p className="text-violet-700">선택</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwipeCalander;
