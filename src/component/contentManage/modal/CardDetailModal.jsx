import { Flex, Modal, Button, Typography, Select, Input } from "antd";
import { visibleOptions, selectStyle, categoryOptions } from "../settings";
import { useState } from "react";

const CardDetailModal = ({ open, onCancel, data }) => {
  if (!data) return null;

  const [visible, setVisible] = useState(
    visibleOptions.find((item) => item.value == data.visible).value
  );
  const [category, setCategory] = useState(
    categoryOptions.find((item) => item.value == data.category).value
  );
  const labelList = [
    { title: "공개여부", required: true },
    { title: "카테고리", required: true },
    { title: "제목", required: true },
    { title: "썸네일", required: true },
    { title: "커버 이미지", required: true },
    { title: "카드 뉴스 본문", required: true },
  ];
  console.log(category);
  return (
    <Modal
      title={
        <Typography.Title level={3} style={{ margin: 0 }}>
          카드뉴스 상세
        </Typography.Title>
      }
      open={open}
      onCancel={onCancel}
      footer={
        <Flex justify="space-between">
          <Button danger onClick={() => console.log("삭제")}>
            삭제
          </Button>
          <Button
            key="submit"
            type="primary"
            loading={false}
            onClick={() => console.log("저장")}
          >
            저장
          </Button>
        </Flex>
      }
      width={700}
    >
      <>
        <Flex gap={20} justify="flex-end">
          <p>
            <strong>등록일:</strong> {data.registDate}
          </p>

          <p>
            <strong>수정일:</strong> YYYY-MM-DD
          </p>
        </Flex>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "100px 2fr",
            gap: "16px",
          }}
        >
          <strong>공개상태</strong>
          <Select
            style={selectStyle}
            options={visibleOptions.filter((item) => item.value !== "all")}
            value={visible}
            onChange={(value) => setVisible(value)}
          />

          <strong>카테고리</strong>
          <Select
            style={selectStyle}
            options={categoryOptions.filter((item) => item.value !== "all")}
            value={category}
            onChange={(value) => setCategory(value)}
          />

          <strong>제목</strong>

          <Input />

          <div>
            <strong>카테고리</strong>
          </div>
          <div>{data.category}</div>

          <div>
            <strong>이미지 수</strong>
          </div>
          <div>{data.imageCount}</div>

          <div>
            <strong>찜 횟수</strong>
          </div>
          <div>{data.likes}</div>
        </div>
      </>
    </Modal>
  );
};

export default CardDetailModal;
