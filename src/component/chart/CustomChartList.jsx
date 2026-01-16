import { Typography } from "antd";
import CustomRadar from "./CustomRadar";
import SwipeLineChart from "./SwipeLineChart";

const CustomChartList = () => {
  // 임의의 데이터
  const ranges = {
    대사: {
      가속: [0, 40],
      평균: [40, 70],
      저속: [70, 100],
    },
    면역체계: {
      가속: [0, 35],
      평균: [35, 65],
      저속: [65, 100],
    },
    호흡기: {
      가속: [0, 45],
      평균: [45, 75],
      저속: [75, 100],
    },
    혈관: {
      가속: [0, 38],
      평균: [38, 68],
      저속: [68, 100],
    },
    뇌: {
      가속: [0, 42],
      평균: [42, 72],
      저속: [72, 100],
    },
    "관절 · 뼈": {
      가속: [0, 36],
      평균: [36, 66],
      저속: [66, 100],
    },
  };

  const realValues = {
    대사: 30,
    면역체계: 48,
    호흡기: 72,
    혈관: 2,
    뇌: 89,
    "관절 · 뼈": 51,
  };

  return (
    <>
      <Typography.Title level={5}>custom radar chart</Typography.Title>
      <CustomRadar ranges={ranges} realValues={realValues} />
      <Typography.Title level={5}>custom line chart</Typography.Title>
      <p>❛ ֊ ❛가로로 스크롤 해보세요.</p>
      <SwipeLineChart />
    </>
  );
};

export default CustomChartList;
