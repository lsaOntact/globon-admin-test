import { useState } from "react";
import dummyData from "./dummyRoutineData.json";
import { RedoOutlined } from "@ant-design/icons";
import { Button, Form, Flex, Typography, Select, Table, Tag } from "antd";
import Link from "antd/es/typography/Link";
import { visibleOptions, selectStyle, goalOptions } from "./settings";

const Routine = () => {
  const [form] = Form.useForm();
  const [filterOptions, setFilterOptions] = useState({
    goal: "all",
    visible: "all",
  });
  const [filteredData, setFilteredData] = useState(dummyData);
  const [routineFormModalInfo, setRoutineFormModalInfo] = useState({
    open: false,
    type: null,
    id: null,
  });

  const [selectedGoal, setSelectedGoal] = useState(null);

  const onChangeOption = (name) => (val) => {
    setFilterOptions((prev) => ({ ...prev, [name]: val }));
  };

  const onClickSearch = () => {
    const filtered = dummyData.filter((item) => {
      const goalMatch =
        filterOptions.goal === "all" || item.goal === filterOptions.goal;
      const visibleMatch =
        filterOptions.visible === "all" ||
        item.visible === filterOptions.visible;
      return goalMatch && visibleMatch;
    });
    setFilteredData(filtered);
  };

  const onClickReset = () => {
    setFilterOptions({ goal: "all", visible: "all" });
    setFilteredData(dummyData);
  };

  const handleOpenModal = (type, record) => {
    setRoutineFormModalInfo({
      open: true,
      type,
      id: record ? record.id : null,
    });
    if (record) {
      setSelectedGoal(record);
    }
  };

  const handleCloseModal = () => {
    setRoutineFormModalInfo({ open: false, type: null, id: null });
    setSelectedGoal(null);
  };

  const dataColumn = [
    { title: "No", dataIndex: "no", key: "no", align: "center", width: 80 },
    {
      title: "공개상태",
      width: 120,
      align: "center",
      dataIndex: "visible",
      key: "visible",
      render: (value) => (
        <Tag color={value ? "green" : "red"}>{value ? "공개" : "비공개"}</Tag>
      ),
    },
    {
      title: "건강목표",
      dataIndex: "goal",
      key: "goal",
      sorter: (a, b) => a.goal.localeCompare(b.goal),
    },
    {
      title: "단계",
      dataIndex: "step",
      key: "step",
    },
    {
      title: "루틴",
      width: "40%",
      dataIndex: "routine",
      key: "routine",
      sorter: (a, b) => a.routine.localeCompare(b.routine),
      render: (routine, record) => (
        <Link onClick={() => handleOpenModal("edit", record)}>{routine}</Link>
      ),
    },
    {
      title: "등록일",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
  ];

  return (
    <>
      <Typography.Title level={3}>루틴 관리</Typography.Title>
      {/* Filter */}
      <Flex justify="space-between" style={{ marginBottom: 30 }}>
        <Form layout="inline" form={form}>
          <Form.Item label={"건강목표"} colon={false}>
            <Select
              options={goalOptions}
              value={filterOptions.goal}
              style={selectStyle}
              onChange={onChangeOption("goal")}
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
          <Button onClick={() => setCategoryModalOpen(true)}>루틴 추가</Button>
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
    </>
  );
};

export default Routine;
