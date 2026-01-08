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
  Popconfirm,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { visibleOptions, selectStyle, categoryOptions } from "../settings";
import { useState, useEffect } from "react";

/**
 * 카드뉴스 등록/수정 모달
 * @param {boolean} open - 모달 오픈 여부
 * @param {function} onCancel - 모달 닫기 핸들러
 */
const RoutineAddModal = ({ open, onCancel }) => {
  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      title={
        <Typography.Title level={3} style={{ margin: 0 }}>
          루틴 추가하기
        </Typography.Title>
      }
      open={open}
      onCancel={handleCancel}
      styles={{ body: { maxHeight: "70vh", overflowY: "auto" } }}
      footer={
        <Flex justify="flex-end">
          <Button
            key="submit"
            type="primary"
            loading={false}
            onClick={handleSave}
            disabled={isDeleted}
          >
            추가
          </Button>
        </Flex>
      }
      width={700}
    >
      <div
        style={{
          marginTop: isEditMode ? 0 : 30,
          display: "grid",
          gridTemplateColumns: "100px 2fr",
          gap: "16px",
        }}
      >
        <strong>공개여부</strong>
        <Select
          style={selectStyle}
          options={visibleOptions.filter((item) => item.value !== "all")}
          value={formData.visible}
          onChange={(value) => updateFormData("visible", value)}
          disabled={isDeleted}
        />
        <strong>카테고리</strong>
        <strong>단계</strong>
        <strong>BMI</strong>
      </div>
    </Modal>
  );
};

export default RoutineAddModal;
