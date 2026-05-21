// src/components/focus/CancelSessionModal.jsx

import { Modal, Typography, Space, Button } from "antd";

const { Title, Paragraph } = Typography;

const CancelSessionModal = ({
  open,
  handleConfirmCancel,
  handleContinueSession,
}) => {
  return (
    <Modal open={open} footer={null} centered closable={false}>
      <div className="text-center py-4">
        <Title level={3}>Cancel Session?</Title>

        <Paragraph type="secondary">
          Are you sure you want to cancel this focus session?
        </Paragraph>

        <Space className="mt-4">
          <Button danger size="large" onClick={handleConfirmCancel}>
            Yes
          </Button>

          <Button type="primary" size="large" onClick={handleContinueSession}>
            No
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default CancelSessionModal;
