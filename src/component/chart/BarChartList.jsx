import { Bar } from "@ant-design/plots";
import { Column } from "@ant-design/plots";
import { Typography } from "antd";
import { columnData, data } from "./data";

const BarChartList = () => {
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
      <Typography.Title level={3}>가로 바 차트(Antd)</Typography.Title>
      <div>
        <Bar {...barConfig} />
      </div>
      <Typography.Title level={3}>세로 바 차트(Antd)</Typography.Title>
      <div>
        <Column {...columnConfig} />
      </div>
    </>
  );
};

export default BarChartList;
