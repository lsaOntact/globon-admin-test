import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

// 마지막 일에 고정되는 대쉬 점선
const verticalLinePlugin = {
  id: "verticalLine",
  afterDatasetsDraw(chart) {
    const {
      ctx,
      chartArea: { top, bottom },
      scales: { x },
    } = chart;

    // 마지막 데이터 포인트의 x 위치
    const lastIndex = chart.data.labels.length - 1;
    const xPos = x.getPixelForValue(lastIndex);

    ctx.save();
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(xPos, top);
    ctx.lineTo(xPos, bottom);
    ctx.stroke();
    ctx.restore();
  },
};

const SwipeLineChart = () => {
  const chartData = [
    75, 74.5, 73.8, 73.2, 72.5, 71.8, 71.2, 70.5, 69.8, 69.2, 68.5, 68.2, 67.8,
    67.5, 67.2, 66.8, 66.5, 66.2, 65.8, 65.5, 65.2, 64.8, 64.5, 64.2, 63.8,
    63.5, 63.2, 62.8, 62.5, 62.2, 62,
  ];

  // 고정된 Y축 차트 옵션 (오른쪽)
  const yAxisOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: { display: false },
    },
    scales: {
      y: {
        position: "right",
        min: 61,
        max: 76,
        ticks: {
          stepSize: 5,
          color: "#A2A9B4",
        },
        grid: {
          display: false,
        },
        border: {
          display: false, // y축 경계선 제거
        },
      },
      x: {
        display: false,
      },
    },
  };

  // 스크롤되는 메인 차트 옵션
  const mainOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      datalabels: {
        display: true,
        align: "top",
        anchor: "end",
        color: "#A2A9B4",
        font: {
          size: 11,
          weight: "bold",
        },
        formatter: (value) => value,
      },
      verticalLine: true,
    },
    scales: {
      y: {
        min: 61,
        max: 76,
        ticks: {
          display: false, // y축 숫자만 숨김
        },
        border: {
          display: false, // y축 경계선 제거
        },
        grid: {
          color: "#F6F7F9",
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: "#A2A9B4",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const yAxisData = {
    labels: [""],
    datasets: [
      {
        data: [68.5],
        borderColor: "transparent",
        backgroundColor: "transparent",
      },
    ],
  };

  const mainData = {
    labels: Array.from({ length: 31 }, (_, i) => `${i + 1}일`),
    datasets: [
      {
        label: "몸무게(kg)",
        data: chartData,
        fill: false,
        borderColor: "#39B695",
        backgroundColor: "#39B695",
        tension: 0.8,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  return (
    <div className="flex border border-slate-400 rounded-lg overflow-hidden p-2 w-[400px] h-[400px]">
      {/* 스크롤되는 차트 */}
      <div
        className="flex-1 overflow-x-auto scrollbar-hide h-full"
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="w-[2000px] h-full">
          <Line
            options={mainOptions}
            data={mainData}
            plugins={[verticalLinePlugin]}
          />
        </div>
      </div>

      {/* 고정된 Y축 (오른쪽) */}
      <div className="w-[50px] h-full flex-shrink-0 ml-[-20px]">
        <Line options={yAxisOptions} data={yAxisData} />
      </div>
    </div>
  );
};

export default SwipeLineChart;
