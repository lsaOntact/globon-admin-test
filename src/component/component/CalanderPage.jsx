import { Space, Typography } from "antd";
import SwipeCalander from "./SwipeCalander";
import FullCalander from "./FullCalander";

const CalanderPage = () => {
  return (
    <Space size={"large"}>
      <section>
        <Typography.Title level={5}>일반 달력</Typography.Title>
        <Typography.Text>사용 라이브러리 : react-calander</Typography.Text>
        <FullCalander />
      </section>

      <section>
        <Typography.Title level={5}>일자형 스와이프 달력</Typography.Title>
        <Typography.Text>
          사용 라이브러리 : swiper/react, react-circular-progressbar
        </Typography.Text>
        <SwipeCalander />
      </section>
    </Space>
  );
};

export default CalanderPage;
