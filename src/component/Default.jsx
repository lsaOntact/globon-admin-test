import { Space, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";

const Default = () => {
  const { Link } = Typography;
  return (
    <Space direction="vertical">
      <Typography.Title level={3}>버전</Typography.Title>
      <Paragraph>
        React v18.3.1
        <br />
        Antd v5.29.1
      </Paragraph>

      <Typography.Title level={3}>차트 라이브러리</Typography.Title>

      <Link
        target="_blank"
        href="https://react-chartjs-2.js.org/examples/vertical-bar-chart"
      >
        Chart.js(링크)
      </Link>
      <Paragraph>
        <blockquote>
          장점: 국내에서 가장 많이 사용하는 라이브러리이고, 온택트헬스
          프로젝트에서 그래프 세팅들을 베껴올 수 있습니다. <br />
          단점: 커스텀을 하려면 플러그인을 설치해야 하기 때문에 이 부분에서 조금
          까다롭습니다.
        </blockquote>
      </Paragraph>

      <Link
        target="_blank"
        href="https://ant-design-charts.antgroup.com/en/components/plots/bar"
      >
        Antd chart(링크)
      </Link>
      <Paragraph>
        <blockquote>
          장점: 다양한 그래프를 지원합니다. <br />
          단점: 문서가 중국어 위주라서 읽기가 어렵고 사용 커뮤니티가 적습니다.
          <br />
          antd 호환을 위한 버전 맞추기가 까다롭습니다.
        </blockquote>
      </Paragraph>

      <Link
        target="_blank"
        href="https://recharts.github.io/en-US/examples/LineBarAreaComposedChart/"
      >
        Recharts(링크)
      </Link>
      <Paragraph>
        <blockquote>
          장점: 컴포넌트 방식으로 사용하며, 리액트 프로젝트에 친화적입니다.
          커스터마이징이 자유로운 편입니다.
          <br />
          단점: 디자인이 위 2개에 비해서 예쁘진 않고 애니메이션도 적습니다.
        </blockquote>
      </Paragraph>
      <p>
        참고:
        <Link
          target="_blank"
          href="https://npm-compare.com/ko-KR/@ant-design/charts,chart.js,recharts"
        >
          npm-compare.com
        </Link>
      </p>
    </Space>
  );
};

export default Default;
