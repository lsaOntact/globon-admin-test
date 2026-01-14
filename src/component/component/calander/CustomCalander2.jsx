import { useState } from "react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { LeftArrow, RightArrow } from "../common/common";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const CustomCalander2 = () => {
  const today = dayjs();

  // 오늘 날짜가 달력의 6번째 위치(인덱스 5)에 오도록 초기화
  const [dateValue, setDateValue] = useState(today.subtract(5, "day"));
  const [selectedDate, setSelectedDate] = useState(null);

  // 7일간 날짜 배열 생성
  const weekDates = Array.from({ length: 7 }, (_, i) =>
    dateValue.add(i, "day")
  );

  // 이전 주로 이동
  const goToPreviousWeek = () => {
    setDateValue(dateValue.subtract(7, "day"));
  };

  // 다음 주로 이동
  const goToNextWeek = () => {
    setDateValue(dateValue.add(7, "day"));
  };

  // 주의 시작일과 종료일 계산
  const getWeekRange = () => {
    const startDate = dateValue;
    const endDate = dateValue.add(6, "day");
    return `${startDate.format("MM.DD")} ~ ${endDate.format("MM.DD")}`;
  };

  // 요일 헤더 생성
  const getWeekdayHeaders = () => {
    const allWeekdays = ["일", "월", "화", "수", "목", "금", "토"];
    return weekDates.map((date) => allWeekdays[date.day()]);
  };

  const weekdayHeaders = getWeekdayHeaders();

  // 날짜가 오늘인지 확인
  const isToday = (date) => {
    return date.isSame(today, "day");
  };

  // 날짜가 선택되었는지 확인
  const isSelected = (date) => {
    if (!selectedDate) return false;
    return date.isSame(selectedDate, "day");
  };

  // 날짜에 대한 라벨 가져오기 (어제/오늘/내일)
  const getDateLabel = (date) => {
    if (date.isSame(today, "day")) return "오늘";
    if (date.isSame(today.subtract(1, "day"), "day")) return "어제";
    if (date.isSame(today.add(1, "day"), "day")) return "내일";
    return "";
  };

  // 현재 주에 오늘이 포함되어 있는지 확인
  const isTodayInCurrentWeek = () => {
    const startDate = dateValue;
    const endDate = dateValue.add(6, "day");
    return (
      today.isSameOrAfter(startDate, "day") &&
      today.isSameOrBefore(endDate, "day")
    );
  };

  // 날짜 버튼의 스타일 클래스 반환
  const getDateButtonClass = (date, isSunday) => {
    if (isSelected(date)) return "bg-[#E0F2ED] text-[#39B695]";
    if (isToday(date)) return "bg-[#282828] text-white";
    if (isSunday) return "bg-gray-100 text-[#FD5A4B]";
    return "bg-gray-100 text-[#282828]";
  };

  return (
    <div className="week-calendar w-[375px]">
      {/* 주간 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousWeek}
          className="w-[28px] h-[28px] flex justify-center items-center"
        >
          <LeftArrow fillColor="#282828" />
        </button>
        <p className="text-[#282828] font-semibold text-base">
          {getWeekRange()}
        </p>
        <button
          onClick={isTodayInCurrentWeek() ? undefined : goToNextWeek}
          className="w-[28px] h-[28px] flex justify-center items-center"
        >
          <RightArrow
            fillColor={isTodayInCurrentWeek() ? "#DADEE4" : "#282828"}
          />
        </button>
      </div>

      <div className="date-grid grid grid-cols-7 gap-[10px]">
        {/* 요일 헤더 */}
        {weekdayHeaders.map((day, index) => (
          <div
            key={`day-${index}`}
            className={`text-center font-semibold mb-[6px] ${
              day === "일" ? "text-[#FD5A4B]" : "text-[#767C88]"
            }`}
          >
            {day}
          </div>
        ))}
        {/* 날짜 그리드 */}
        {weekDates.map((date, index) => {
          const isSunday = date.day() === 0;
          const label = getDateLabel(date);
          return (
            <div className="flex flex-col items-center" key={`date-${index}`}>
              <button
                onClick={() => setSelectedDate(date)}
                className={`
                   w-[28px] h-[28px] rounded-2xl bg-transparent text-center cursor-pointer transition-colors font-semibold flex flex-col items-center justify-center py-2
                  ${getDateButtonClass(date, isSunday)}
                `}
              >
                <span className="text-base">{date.date()}</span>
              </button>
              {label && (
                <span className="text-xs mt-[6px] text-[#A2A9B4] font-semibold">
                  {label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalander2;
