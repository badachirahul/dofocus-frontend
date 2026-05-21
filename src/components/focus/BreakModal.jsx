import { Modal, Button, Space, Typography } from "antd";

const { Title, Paragraph } = Typography;

const BreakModal = ({ open, handleNextTask, handleTakeBreak }) => {
  return (
    <Modal open={open} footer={null} centered closable={false}>
      <div className="text-center py-4">
        <Title level={3}>Great Work 🎉</Title>

        <Paragraph type="secondary">What do you want to do next?</Paragraph>

        <Space className="mt-4">
          <Button type="primary" size="large" onClick={handleNextTask}>
            Next Task
          </Button>

          <Button size="large" onClick={handleTakeBreak}>
            Take Break
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default BreakModal;
