import {
  Flex,
  Modal,
  Button,
  Typography,
  Select,
  Input,
  Image,
  Space,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { visibleOptions, selectStyle, categoryOptions } from "../settings";
import { useState } from "react";

const CardEditModal = ({ open, onCancel, data }) => {
  if (!data) return null;

  const [visible, setVisible] = useState(
    visibleOptions.find((item) => item.value == data.visible).value
  );
  const [category, setCategory] = useState(
    categoryOptions.find((item) => item.value == data.category).value
  );

  const [title, setTitle] = useState(data.title);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const labelList = [
    { title: "공개여부", required: true },
    { title: "카테고리", required: true },
    { title: "제목", required: true },
    { title: "썸네일", required: true },
    { title: "커버 이미지", required: true },
    { title: "카드 뉴스 본문", required: true },
  ];

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
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
          />

          <strong>썸네일</strong>
          <Space direction="vertical">
            <Upload
              beforeUpload={(file) => {
                const previewUrl = URL.createObjectURL(file);
                setThumbnailPreview(previewUrl);
                return false;
              }}
              maxCount={1}
              accept="image/*"
              onRemove={() => {
                if (thumbnailPreview) {
                  URL.revokeObjectURL(thumbnailPreview);
                  setThumbnailPreview(null);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>이미지 추가하기</Button>
            </Upload>

            <Image
              preview={false}
              width={200}
              alt="basic"
              src={
                thumbnailPreview ||
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              }
            />
            <Typography.Text style={{ color: "#7d7d7d" }}>
              335x369크기의 이미지를 업로드해주세요.
            </Typography.Text>
          </Space>

          <strong>커버 이미지</strong>
          <Space direction="vertical">
            <Upload
              beforeUpload={(file) => {
                const previewUrl = URL.createObjectURL(file);
                setCoverPreview(previewUrl);
                return false;
              }}
              maxCount={1}
              accept="image/*"
              onRemove={() => {
                if (coverPreview) {
                  URL.revokeObjectURL(coverPreview);
                  setCoverPreview(null);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>이미지 추가하기</Button>
            </Upload>

            <Image
              preview={false}
              width={200}
              alt="basic"
              src={
                coverPreview ||
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              }
            />
            <Typography.Text style={{ color: "#7d7d7d" }}>
              375x500크기의 이미지를 업로드해주세요.
            </Typography.Text>
          </Space>

          <strong>카드 뉴스 본문</strong>
          <div>{data.likes}</div>
        </div>
      </>
    </Modal>
  );
};

export default CardEditModal;
