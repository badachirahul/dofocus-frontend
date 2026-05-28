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
      <div className="text-center py-6 px-2">
        <div className="mx-auto h-12 w-12 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center mb-5 text-2xl">
          ⚠️
        </div>
        <Title level={3} className="!m-0 !text-white !tracking-tight">
          Cancel Session?
        </Title>

        <Paragraph className="!mt-2 !mb-6 !text-neutral-400">
          Are you sure you want to cancel this focus session?
        </Paragraph>

        <Space size="middle">
          <Button danger size="large" onClick={handleConfirmCancel}>
            Yes, cancel
          </Button>

          <Button type="primary" size="large" onClick={handleContinueSession}>
            Keep going
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default CancelSessionModal;
