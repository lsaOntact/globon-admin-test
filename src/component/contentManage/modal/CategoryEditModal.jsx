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
/**
 * 카테고리 수정 모달
 * @param {boolean} open - 모달 오픈 여부
 * @param {function} onCancel - 모달 닫기 핸들러
 * @param {object}
 */
const CategoryEditModal = ({ open, onCancel }) => {
  const handleSave = () => {
    console.log("save");
  };

  return (
    <Modal
      title={
        <Typography.Title level={3} style={{ margin: 0 }}>
          카테고리 편집(어떻게 편집할지 모름)
        </Typography.Title>
      }
      open={open}
      onCancel={onCancel}
      styles={{ body: { maxHeight: "70vh", overflowY: "auto" } }}
      footer={
        <Flex justify="flex-end">
          <Button type="primary" loading={false} onClick={handleSave}>
            저장
          </Button>
        </Flex>
      }
      width={700}
    >
      <div style={{ marginTop: 30 }}>
        <Space>
          <strong>카테고리 명</strong>
          <Input placeholder="카테고리 명 입력" />
          <Button>추가하기</Button>
        </Space>
      </div>
    </Modal>
  );
};

export default CategoryEditModal;
