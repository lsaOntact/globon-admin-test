import { useState } from "react";
import dummyData from "./dummyData.json";
import { RedoOutlined } from "@ant-design/icons";
import { Button, Form, Flex, Typography, Select, Table, Tag } from "antd";
import Link from "antd/es/typography/Link";
import CardFormModal from "./modal/CardFormModal";
import { categoryOptions, visibleOptions, selectStyle } from "./settings";

const CardNews = () => {
  const [form] = Form.useForm();
  const [filterOptions, setFilterOptions] = useState({
    category: "all",
    visible: "all",
  });
  const [filteredData, setFilteredData] = useState(dummyData);
  const [modalInfo, setModalInfo] = useState({
    open: false,
    type: null,
    id: null,
  });
  const [selectedCard, setSelectedCard] = useState(null);

  const onChangeOption = (name) => (val) => {
    setFilterOptions((prev) => ({ ...prev, [name]: val }));
  };

  const onClickSearch = () => {
    const filtered = dummyData.filter((item) => {
      const categoryMatch =
        filterOptions.category === "all" ||
        item.category === filterOptions.category;
      const visibleMatch =
        filterOptions.visible === "all" ||
        item.visible === filterOptions.visible;
      return categoryMatch && visibleMatch;
    });
    setFilteredData(filtered);
  };

  const onClickReset = () => {
    setFilterOptions({ category: "all", visible: "all" });
    setFilteredData(dummyData);
  };

  const handleOpenModal = (type, record) => {
    setModalInfo({ open: true, type, id: record ? record.id : null });
    if (record) {
      setSelectedCard(record);
    }
  };

  const handleCloseModal = () => {
    setModalInfo({ open: false, type: null, id: null });
    setSelectedCard(null);
  };

  const dataColumn = [
    { title: "No", dataIndex: "no", key: "no", align: "center", width: 80 },
    {
      title: "카테고리",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (title, record) => (
        <Link onClick={() => handleOpenModal("edit", record)}>{title}</Link>
      ),
    },
    { title: "이미지 수", dataIndex: "imageCount", key: "imageCount" },
    { title: "찜 횟수", dataIndex: "likes", key: "likes" },
    {
      title: "공개상태",
      dataIndex: "visible",
      key: "visible",
      render: (value) => (
        <Tag
          color={
            value == "non-visible"
              ? "red"
              : value == "visible"
              ? "green"
              : undefined
          }
        >
          {value == "non-visible"
            ? "비공개"
            : value == "visible"
            ? "공개"
            : "삭제"}
        </Tag>
      ),
    },
    {
      title: "등록일",
      dataIndex: "registDate",
      key: "registDate",
      sorter: (a, b) => new Date(a.registDate) - new Date(b.registDate),
    },
  ];

  return (
    <>
      <Typography.Title level={3}>카드뉴스 관리</Typography.Title>
      {/* Filter */}
      <Flex justify="space-between" style={{ marginBottom: 30 }}>
        <Form layout="inline" form={form}>
          <Form.Item label={"카테고리"} colon={false}>
            <Select
              options={categoryOptions}
              value={filterOptions.category}
              style={selectStyle}
              onChange={onChangeOption("category")}
            />
          </Form.Item>
          <Form.Item label="공개상태" colon={false}>
            <Select
              style={selectStyle}
              options={visibleOptions}
              value={filterOptions.visible}
              onChange={onChangeOption("visible")}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={onClickReset}>
              <RedoOutlined />
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={onClickSearch}>
              검색
            </Button>
          </Form.Item>
        </Form>

        {/* Button */}
        <Flex gap={10}>
          <Button>카테고리 편집</Button>
          <Button onClick={() => handleOpenModal("add")}>카드뉴스 추가</Button>
        </Flex>
      </Flex>

      {/* Table */}
      <Table
        columns={dataColumn}
        dataSource={filteredData}
        rowKey="id"
        scroll={{ y: 1000 }}
        showSorterTooltip={{ title: "정렬하려면 클릭하세요" }}
      />

      {/* Modal */}
      <CardFormModal
        open={modalInfo.open}
        onCancel={handleCloseModal}
        data={selectedCard}
        type={modalInfo.type}
      />
    </>
  );
};

export default CardNews;
