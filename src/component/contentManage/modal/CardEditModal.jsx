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
  message,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
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
  const [cardNewsFiles, setCardNewsFiles] = useState([]);

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("visible", visible);
    formData.append("category", category);

    cardNewsFiles.forEach((file) => {
      if (file.originFileObj) {
        formData.append("cardNewsFiles", file.originFileObj);
      }
    });

    try {
      const response = await fetch("/api/card-news/update", {
        method: "POST",
        body: formData,
      });
    } catch (error) {}
  };

  return (
    <Modal
      title={
        <Typography.Title level={3} style={{ margin: 0 }}>
          카드뉴스 상세
        </Typography.Title>
      }
      open={open}
      onCancel={onCancel}
      styles={{ body: { maxHeight: "70vh", overflowY: "auto" } }}
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
          <Space direction="vertical" style={{ width: "100%" }}>
            <Typography.Text style={{ color: "#7d7d7d" }}>
              썸네일과 커버 이미지를 제외한 카드뉴스 본문만 업로드 해주세요.
            </Typography.Text>

            <Dragger
              cardNewsFiles={cardNewsFiles}
              setCardNewsFiles={setCardNewsFiles}
            />
          </Space>
        </div>
      </>
    </Modal>
  );
};

const Dragger = ({ cardNewsFiles, setCardNewsFiles }) => {
  const props = {
    name: "multiple file",
    multiple: true,
    maxCount: 10,
    listType: "picture-card",
    accept: "image/*",
    showUploadList: {
      showPreviewIcon: false,
    },
    // 업로드한 파일을 서버로 전송할 API 엔드포인트 URL
    // action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      setCardNewsFiles(info.fileList);
      // if (status !== "uploading") {
      //   console.log(info.file, info.fileList);
      // }
      // if (status === "done") {
      //   message.success(`${info.file.name} file uploaded successfully.`);
      // } else if (status === "error") {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
    beforeUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error(`${file.name}의 크기가 5mb를 초과합니다.`);
        return Upload.LIST_IGNORE;
      }
      // return isLt5M || Upload.LIST_IGNORE;
      return false; // 자동 업로드 방지
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <Upload.Dragger {...props} style={{ height: 100, marginBottom: 10 }}>
      <p className="ant-upload-drag-icon" style={{ marginBottom: 5 }}>
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        이미지를 끌어오거나 파일을 선택해주세요.
      </p>
      <p className="ant-upload-hint" style={{ marginTop: 0 }}>
        (최대 10장, 장당 5Mb까지 업로드 가능합니다.)
      </p>
    </Upload.Dragger>
  );
};

export default CardEditModal;
