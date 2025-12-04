import { Column as AntdColumn, DualAxes } from "@ant-design/plots";
import { Flex, Typography } from "antd";
import {
  AntdColumnData,
  ChartJsBarData,
  ChartJsMultipleData,
  dualAxesData,
} from "./data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  LineController,
  BarController,
} from "chart.js";
import { Bar as ChartJsBar, Chart as ChartJsMultiple } from "react-chartjs-2";
import { RechartMultipleBar, RechartSimpleBar } from "./RechartBar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  LineController,
  BarController
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

  const dualAxesConfig = {
    xField: "month",
    data: dualAxesData,
    legend: {
      color: {
        order: ["data1", "data2", "data3"],
        itemMarker: (v) => {
          if (v === "data1") return "rect";
          return "smooth";
        },
      },
    },
    scale: {
      y: { domainMax: 10 },
      color: {
        domain: ["data1", "data2", "data3"],
        range: ["#3d54ffff", "#fdae6b", "#82ca9d"],
      },
    },
    children: [
      {
        type: "area",
        yField: "data3",
        shapeField: "smooth",
        style: { fillOpacity: 0.3, fill: "#82ca9d", stroke: "#82ca9d" },
        axis: { y: false },
      },
      {
        type: "interval",
        yField: "data1",
        style: { fill: "#3d54ffff", maxWidth: 20 },
      },
      {
        type: "line",
        yField: "data2",
        shapeField: "smooth",
        axis: { y: { position: "right" } },
        style: { lineWidth: 2, stroke: "#fdae6b" },
      },
    ],
  };

  const columnConfig = {
    data: AntdColumnData,
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
      <Typography.Title level={3}>Antd chart</Typography.Title>
      <Flex>
        <DualAxes {...dualAxesConfig} />
        <AntdColumn {...columnConfig} />
      </Flex>

      <Typography.Title level={3}>Chart.js</Typography.Title>
      <Flex>
        <div style={{ flex: 1 }}>
          <ChartJsMultiple
            type="bar"
            data={ChartJsMultipleData}
            options={options}
          />
        </div>
        <div style={{ flex: 1 }}>
          <ChartJsBar options={options} data={ChartJsBarData} />
        </div>
      </Flex>

      <Typography.Title level={3}>Rechart</Typography.Title>
      <Flex>
        <RechartMultipleBar />
        <RechartSimpleBar />
      </Flex>
    </>
  );
};

export default BarChartList;
