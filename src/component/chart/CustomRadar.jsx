import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js 컴포넌트 등록
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function CustomRadar({ ranges, realValues }) {
  const labels = Object.keys(ranges);

  // 값의 상태 판단 (고속/평균/저속)
  const getValueStatus = (value, category) => {
    const categoryRanges = ranges[category];
    if (value >= categoryRanges.가속[0] && value <= categoryRanges.가속[1]) {
      return { status: "고속", color: "#EF5757" };
    } else if (
      value >= categoryRanges.평균[0] &&
      value <= categoryRanges.평균[1]
    ) {
      return { status: "평균", color: "#FFA726" };
    } else {
      return { status: "저속", color: "#4FC09B" };
    }
  };

  // 각 포인트의 색상 배열 생성
  const pointColors = labels.map((label) => {
    const value = realValues[label];
    return getValueStatus(value, label).color;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "실제값",
        data: Object.values(realValues),
        fill: true,
        backgroundColor: "rgba(79, 192, 155, 0.15)",
        borderColor: "#4FC09B",
        borderWidth: 2,
        pointBackgroundColor: pointColors, // 각 포인트마다 다른 색상
        pointBorderColor: "#fff",
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    devicePixelRatio: 2,
    maintainAspectRatio: true,
    aspectRatio: 1,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: { display: false },
    },
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          display: false,
          stepSize: 50,
        },
        pointLabels: {
          font: {
            size: 14,
            weight: 500,
            family: "Pretendard",
          },
          color: "#767C88",
          padding: 20,
        },
        grid: {
          color: "#E2E6ED",
          lineWidth: 1,
        },
        angleLines: {
          color: "#E2E6ED",
          lineWidth: 1,
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-[400px] h-[400px]">
        <Radar data={data} options={options} />
      </div>
      <div className="flex gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#4FC09B]"></div>
          <span className="text-sm">저속노화</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FFA726]"></div>
          <span className="text-sm">평균노화</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF5757]"></div>
          <span className="text-sm">가속노화</span>
        </div>
      </div>
    </div>
  );
}

export default CustomRadar;
