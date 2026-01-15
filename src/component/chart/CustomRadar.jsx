import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function CustomRadar({ ranges, realValues }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

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

  // 각도 기반 위치 계산
  const getStatusPosition = (index, total) => {
    const angle = Math.PI / 2 - (2 * Math.PI * index) / total;
    const radius = 180; // 차트 중심에서의 거리
    const centerX = 200; // 컨테이너 중심 x
    const centerY = 220; // 컨테이너 중심 y

    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY - Math.sin(angle) * radius,
    };
  };

  const labels = Object.keys(ranges);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current?.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current?.destroy();
      }

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
            pointBackgroundColor: "#4FC09B",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 6,
          },
        ],
      };

      const config = {
        type: "radar",
        data: data,
        options: {
          devicePixelRatio: 2,
          maintainAspectRatio: true,
          aspectRatio: 1,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
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
                color: "#333",
                padding: 20,
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
        },
      };
      if (ctx) {
        chartInstance.current = new Chart(ctx, config);
      }
    }
  }, [ranges, realValues]);

  return (
    <div className="relative w-[400px] h-[400px]">
      <canvas ref={chartRef} />
      {labels.map((label, index) => {
        const value = realValues[label];
        const { status, color } = getValueStatus(value, label);
        const position = getStatusPosition(index, labels.length);

        return (
          <div
            key={label + index}
            className="absolute text-sm font-medium whitespace-nowrap"
            style={{
              color,
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {status}
          </div>
        );
      })}
    </div>
  );
}

export default CustomRadar;
