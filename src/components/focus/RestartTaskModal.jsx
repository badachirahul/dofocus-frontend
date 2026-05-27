import { Modal, Button, Space, Typography } from "antd";

const { Title, Paragraph } = Typography;

const RestartTaskModal = ({
  open,
  handleRestartTask,
  handleBreak,
}) => {
  return (
    <Modal open={open} footer={null} centered closable={false}>
      <div className="text-center py-4">
        <Title level={3}>Do you want to restart task?</Title>

        <Paragraph type="secondary">
          You can restart the same task or take a short break.
        </Paragraph>

        <Space className="mt-4">
          <Button type="primary" size="large" onClick={handleRestartTask}>
            YES
          </Button>

          <Button size="large" onClick={handleBreak}>
            Break
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default RestartTaskModal;