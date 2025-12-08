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
import { useState, useEffect } from "react";

const PLACEHOLDER_IMAGE =
  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";

const IMAGE_CONFIGS = {
  thumbnail: {
    label: "썸네일",
    size: "335x369",
  },
  cover: {
    label: "커버 이미지",
    size: "375x500",
  },
};

/**
 * 카드뉴스 등록/수정 모달
 * @param {boolean} open - 모달 오픈 여부
 * @param {function} onCancel - 모달 닫기 핸들러
 * @param {object} data - 편집 모드일 때 기존 데이터
 * @param {'edit'|'add'} type - 모드 타입
 */
const CardFormModal = ({ open, onCancel, data, type = "add" }) => {
  const isEditMode = type === "edit";
  const modalTitle = isEditMode ? "카드뉴스 수정" : "카드뉴스 등록";

  const [formData, setFormData] = useState({
    visible: "",
    category: "",
    title: "",
    thumbnailPreview: null,
    coverPreview: null,
    cardNewsFiles: [],
  });
  /**
   * EFFECT
   */
  useEffect(() => {
    if (isEditMode && data) {
      setFormData({
        visible:
          visibleOptions.find((item) => item.value == data.visible)?.value ||
          "visible",
        category:
          categoryOptions.find((item) => item.value == data.category)?.value ||
          "카테고리1",
        title: data.title || "",
        thumbnailPreview: null,
        coverPreview: null,
        cardNewsFiles: [],
      });
    } else {
      setFormData({
        visible: "visible",
        category: "카테고리1",
        title: "",
        thumbnailPreview: null,
        coverPreview: null,
        cardNewsFiles: [],
      });
    }
  }, [isEditMode, data]);

  useEffect(() => {
    return () => {
      if (formData.thumbnailPreview) {
        URL.revokeObjectURL(formData.thumbnailPreview);
      }
      if (formData.coverPreview) {
        URL.revokeObjectURL(formData.coverPreview);
      }
    };
  }, [formData.thumbnailPreview, formData.coverPreview]);
  /**
   * FUNCTION
   */
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const submitData = new FormData();

    submitData.append("title", formData.title);
    submitData.append("visible", formData.visible);
    submitData.append("category", formData.category);

    formData.cardNewsFiles.forEach((file) => {
      if (file.originFileObj) {
        submitData.append("cardNewsFiles", file.originFileObj);
      }
    });

    try {
      const endpoint = isEditMode
        ? "/api/card-news/update"
        : "/api/card-news/create";
      const response = await fetch(endpoint, {
        method: "POST",
        body: submitData,
      });

      if (response.ok) {
        message.success(
          `카드뉴스가 ${isEditMode ? "수정" : "등록"}되었습니다.`
        );
        onCancel();
      }
    } catch (error) {
      message.error("저장 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = () => {
    console.log("삭제");
    onCancel();
  };

  const handleCancel = () => {
    const modalBody = document.querySelector(".ant-modal-body");
    if (modalBody) modalBody.scrollTop = 0;
    onCancel();
  };

  return (
    <Modal
      title={
        <Typography.Title level={3} style={{ margin: 0 }}>
          {modalTitle}
        </Typography.Title>
      }
      open={open}
      onCancel={handleCancel}
      styles={{ body: { maxHeight: "70vh", overflowY: "auto" } }}
      footer={
        <Flex justify="space-between">
          {isEditMode && (
            <Button danger onClick={handleDelete}>
              삭제
            </Button>
          )}
          {!isEditMode && <div />}
          <Button
            key="submit"
            type="primary"
            loading={false}
            onClick={handleSave}
          >
            저장
          </Button>
        </Flex>
      }
      width={700}
    >
      <>
        {isEditMode && data && (
          <Flex gap={20} justify="flex-end">
            <p>
              <strong>등록일:</strong> {data.registDate}
            </p>

            {data.updateDate && (
              <p>
                <strong>수정일:</strong> {data.updateDate}
              </p>
            )}
          </Flex>
        )}

        <div
          style={{
            marginTop: isEditMode ? 0 : 30,
            display: "grid",
            gridTemplateColumns: "100px 2fr",
            gap: "16px",
          }}
        >
          <strong>공개상태</strong>
          <Select
            style={selectStyle}
            options={visibleOptions.filter((item) => item.value !== "all")}
            value={formData.visible}
            onChange={(value) => updateFormData("visible", value)}
          />

          <strong>카테고리</strong>
          <Select
            style={selectStyle}
            options={categoryOptions.filter((item) => item.value !== "all")}
            value={formData.category}
            onChange={(value) => updateFormData("category", value)}
          />

          <strong>제목</strong>
          <Input
            value={formData.title}
            onChange={(e) => updateFormData("title", e.target.value)}
            maxLength={50}
          />

          <strong>{IMAGE_CONFIGS.thumbnail.label}</strong>
          <ImageUpload
            preview={formData.thumbnailPreview}
            setPreview={(value) => updateFormData("thumbnailPreview", value)}
            size={IMAGE_CONFIGS.thumbnail.size}
          />

          <strong>{IMAGE_CONFIGS.cover.label}</strong>
          <ImageUpload
            preview={formData.coverPreview}
            setPreview={(value) => updateFormData("coverPreview", value)}
            size={IMAGE_CONFIGS.cover.size}
          />

          <strong>카드 뉴스 본문</strong>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Typography.Text style={{ color: "#7d7d7d" }}>
              썸네일과 커버 이미지를 제외한 카드뉴스 본문만 업로드 해주세요.
            </Typography.Text>

            <Dragger
              cardNewsFiles={formData.cardNewsFiles}
              setCardNewsFiles={(value) =>
                updateFormData("cardNewsFiles", value)
              }
            />
          </Space>
        </div>
      </>
    </Modal>
  );
};

const ImageUpload = ({ preview, setPreview, size }) => {
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (preview === null) {
      setFileList([]);
    }
  }, [preview]);
  return (
    <Space direction="vertical">
      <Upload
        fileList={fileList}
        beforeUpload={(file) => {
          const previewUrl = URL.createObjectURL(file);
          setPreview(previewUrl);
          setFileList([file]);
          return false;
        }}
        maxCount={1}
        accept="image/*"
        onRemove={() => {
          if (preview) {
            URL.revokeObjectURL(preview);
            setPreview(null);
          }
          setFileList([]);
        }}
      >
        <Button icon={<UploadOutlined />}>이미지 추가하기</Button>
      </Upload>

      <Image
        preview={false}
        width={200}
        alt="preview"
        src={preview || PLACEHOLDER_IMAGE}
      />
      <Typography.Text style={{ color: "#7d7d7d" }}>
        {size}크기의 이미지를 업로드해주세요.
      </Typography.Text>
    </Space>
  );
};

const Dragger = ({ cardNewsFiles, setCardNewsFiles }) => {
  const props = {
    name: "multiple file",
    multiple: true,
    maxCount: 10,
    listType: "picture-card",
    accept: "image/*",
    fileList: cardNewsFiles,
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

      // 중복 파일 체크
      const isDuplicate = cardNewsFiles.some(
        (existingFile) =>
          existingFile.name === file.name && existingFile.size === file.size
      );
      if (isDuplicate) return Upload.LIST_IGNORE;

      // 자동 업로드 방지
      return false;
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

export default CardFormModal;
