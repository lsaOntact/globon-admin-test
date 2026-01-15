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
import { color } from "chart.js/helpers";
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
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Line Chart Sample",
      },
      tooltip: {
        enabled: true,
      },
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
          stepSize: 1,
          color: "#A2A9B4",
        },
        grid: {
          color: "#F6F7F9",
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

  const data = {
    labels: Array.from({ length: 31 }, (_, i) => `${i + 1}일`),
    datasets: [
      {
        label: "몸무게(kg)",
        data: [
          75, 74.5, 73.8, 73.2, 72.5, 71.8, 71.2, 70.5, 69.8, 69.2, 68.5, 68.2,
          67.8, 67.5, 67.2, 66.8, 66.5, 66.2, 65.8, 65.5, 65.2, 64.8, 64.5,
          64.2, 63.8, 63.5, 63.2, 62.8, 62.5, 62.2, 62,
        ],
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
    <div
      className="w-[375px] overflow-x-auto scrollbar-hide"
      style={{
        WebkitOverflowScrolling: "touch",
        touchAction: "pan-x",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div className="w-[2000px] h-[400px]">
        <Line options={options} data={data} plugins={[verticalLinePlugin]} />
      </div>
    </div>
  );
};

export default SwipeLineChart;
