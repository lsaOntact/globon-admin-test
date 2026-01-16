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
        backgroundColor: "rgba(79, 192, 155, 0.2)",
        borderColor: "#4FC09B",
        borderWidth: 2,
        pointBackgroundColor: pointColors, // 각 포인트마다 다른 색상
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 6,
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
          stepSize: 20,
        },
        pointLabels: {
          font: {
            size: 14,
            weight: 500,
            family: "Pretendard",
          },
          color: (context) => {
            const index = context.index;
            const label = labels[index];
            const value = realValues[label];
            const { color } = getValueStatus(value, label);
            return color;
          },
          padding: 20,
          callback: (value, index) => {
            const label = labels[index];
            const realValue = realValues[label];
            const { status } = getValueStatus(realValue, label);
            return [label, status]; // 배열로 반환하면 멀티라인으로 표시
          },
        },
        grid: {
          color: "#E0E0E0",
          lineWidth: 1,
        },
        angleLines: {
          color: "#E0E0E0",
          lineWidth: 1,
        },
      },
    },
  };

  return (
    <div className="w-[400px] h-[400px]">
      <Radar data={data} options={options} />
    </div>
  );
}

export default CustomRadar;
