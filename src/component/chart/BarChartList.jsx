import { Bar } from "@ant-design/plots";
import { Column } from "@ant-design/plots";
import { Typography } from "antd";
import { columnData, data, ChartJsData } from "./data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar as ChartJsBar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartList = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const barConfig = {
    data,
    xField: "label",
    yField: "value",
    colorField: "type",
    scale: {
      x: {
        padding: 0.5,
      },
    },
    group: true,
    style: {
      height: 10,
    },
  };

  const columnConfig = {
    data: columnData,
    xField: "day",
    yField: "value",
    colorField: "type",
    scale: {
      color: {
        range: ["#FF6B6B", "#58fff4"],
      },
    },
    group: true,
  };
  return (
    <>
      <Typography.Title level={3}>바 차트1(Antd)</Typography.Title>
      <div>
        <Bar {...barConfig} />
      </div>
      <Typography.Title level={3}>바 차트2(Antd)</Typography.Title>
      <div>
        <Column {...columnConfig} />
      </div>
      <Typography.Title level={3}>바 차트3(Chart.js)</Typography.Title>
      <div>
        <ChartJsBar options={options} data={ChartJsData} />
      </div>
    </>
  );
};

export default BarChartList;
