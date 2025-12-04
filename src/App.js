import { Menu, Layout } from "antd";
import BarChartList from "./component/chart/BarChartList";
import { useState } from "react";
import Default from "./component/Default";
import ContentManage from "./component/contentManage/ContentManage";

const { Sider, Content } = Layout;

function App() {
  const [selectMenu, setSelectMenu] = useState("item0");
  const renderContent = () => {
    switch (selectMenu) {
      case "item0":
        return <Default />;
      case "bar":
        return <BarChartList />;
      case "line":
        return <></>;
      case "item2":
        return <ContentManage />;
      default:
        return <></>;
    }
  };
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
        // {
        //   key: "line",
        //   label: "line",
        // },
      ],
    },
    { key: "item2", label: "컨텐츠 관리" },
  ];
  return (
    <Layout style={layoutStyle}>
      <Sider style={siderStyle}>
        <Menu
          onClick={(e) => setSelectMenu(e.key)}
          style={{ width: "100%" }}
          defaultSelectedKeys={selectMenu}
          defaultOpenKeys={["item1"]}
          mode="inline"
          items={items}
        />
      </Sider>

      <Content style={contentStyle}>
        <div style={{ width: "100%", height: "100%", padding: "20px" }}>
          {renderContent()}
        </div>
      </Content>
    </Layout>
  );
}

export default App;
