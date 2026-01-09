import { Menu, Layout } from "antd";
import BarChartList from "./component/chart/BarChartList";
import Default from "./component/Default";
import CardNews from "./component/contentManage/CardNews";
import Routine from "./component/contentManage/Routine";
import CalanderPage from "./component/component/CalanderPage";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

const { Sider, Content } = Layout;

// 메뉴 키와 라우트 경로 매핑
const routeMap = {
  item0: "/",
  bar: "/chart/bar",
  cardNews: "/content/card-news",
  routine: "/content/routine",
  calander: "/component/calander",
};

// 경로에서 메뉴 키 찾기
const getMenuKeyFromPath = (pathname) => {
  const entry = Object.entries(routeMap).find(([_, path]) => path === pathname);
  return entry ? entry[0] : "item0";
};

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentMenuKey = getMenuKeyFromPath(location.pathname);

  const layoutStyle = {
    width: "100%",
  };

  const contentStyle = {
    backgroundColor: "#fff",
    minHeight: "100%",
  };

  const siderStyle = {
    width: 256,
    backgroundColor: "#00265bff",
  };

  const items = [
    { key: "item0", label: "Default" },
    {
      key: "item1",
      label: "chart",
      children: [
        {
          key: "bar",
          label: "bar",
        },
      ],
    },
    {
      key: "item2",
      label: "컨텐츠 관리",
      children: [
        {
          key: "cardNews",
          label: "카드뉴스 관리",
        },
        {
          key: "routine",
          label: "루틴 관리",
        },
      ],
    },
    {
      key: "component",
      label: "컴포넌트",
      children: [
        {
          key: "calander",
          label: "캘린더",
        },
      ],
    },
  ];

  const handleMenuClick = (e) => {
    const path = routeMap[e.key];
    if (path) {
      navigate(path);
    }
  };

  return (
    <Layout style={layoutStyle}>
      <Sider style={siderStyle}>
        <Menu
          onClick={handleMenuClick}
          style={{ width: "100%" }}
          selectedKeys={[currentMenuKey]}
          defaultOpenKeys={["item1", "item2", "component"]}
          mode="inline"
          items={items}
        />
      </Sider>

      <Content style={contentStyle}>
        <div style={{ width: "100%", height: "100%", padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Default />} index />
            <Route path="/chart/bar" element={<BarChartList />} />
            <Route path="/content/card-news" element={<CardNews />} />
            <Route path="/content/routine" element={<Routine />} />
            <Route path="/component/calander" element={<CalanderPage />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter basename="/globon-admin-test">
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
