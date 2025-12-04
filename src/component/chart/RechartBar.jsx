import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  BarChart,
  Rectangle,
  ResponsiveContainer,
} from "recharts";

import { RechartMultipleData, RechartSimpleBarData } from "./data";

const sizes = {
  width: "100%",
  height: 400,
};

export const RechartMultipleBar = () => {
  return (
    <ResponsiveContainer {...sizes}>
      <ComposedChart data={RechartMultipleData} width={"auto"} height={"auto"}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis width="auto" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="data1" stroke="#ff7300" />
        <Bar dataKey="data2" barSize={20} fill="#413ea0" />
        <Area type="monotone" dataKey="data3" fill="#8884d8" stroke="#8884d8" />
        <Scatter dataKey="data4" fill="red" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export const RechartSimpleBar = () => {
  return (
    <ResponsiveContainer {...sizes}>
      <BarChart data={RechartSimpleBarData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="newVisit"
          name="신규방문"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="returnVisit"
          name="재방문"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
