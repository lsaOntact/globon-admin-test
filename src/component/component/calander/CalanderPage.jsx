import { Space, Typography } from "antd";
import SwipeCalander from "./SwipeCalander";
import FullCalander from "./FullCalander";
import CustomCalander1 from "./CustomCalander1";

const CalanderPage = () => {
  return (
    <Space size={"large"} align="start">
      <section>
        <Typography.Title level={5}>일반 달력</Typography.Title>
        <Typography.Text>사용 라이브러리 : react-calander</Typography.Text>
        <FullCalander />
      </section>

      <section>
        <div>
          <Typography.Title level={5}>일자형 스와이프 달력</Typography.Title>
          <Typography.Text>
            사용 라이브러리 : swiper/react, react-circular-progressbar
          </Typography.Text>
          <SwipeCalander />
        </div>
        <div>
          <Typography.Title level={5}>커스텀 달력1</Typography.Title>
          <Typography.Text>
            사용 라이브러리 : react-calander,react-circular-progressbar
          </Typography.Text>
          <CustomCalander1 />
        </div>
      </section>

      <section></section>
    </Space>
  );
};

export default CalanderPage;
