import { Modal, Button, Space, Typography } from "antd";

const { Title, Paragraph } = Typography;

const CompletionModal = ({
  open,
  handleTaskCompleted,
  handleTaskNotCompleted,
}) => {
  return (
    <Modal open={open} footer={null} centered closable={false}>
      <div className="text-center py-4">
        <Title level={3}>Did you complete the task?</Title>

        <Paragraph type="secondary">Your focus timer has ended.</Paragraph>

        <Space className="mt-4">
          <Button type="primary" size="large" onClick={handleTaskCompleted}>
            YES
          </Button>

          <Button size="large" onClick={handleTaskNotCompleted}>
            NO
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default CompletionModal;
