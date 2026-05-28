import { Modal, Button, Space, Typography } from "antd";

const { Title, Paragraph } = Typography;

const RestartTaskModal = ({ open, handleRestartTask, handleBreak }) => {
  return (
    <Modal open={open} footer={null} centered closable={false}>
      <div className="text-center py-6 px-2">
        <div className="mx-auto h-12 w-12 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center mb-5 text-2xl">
          🔁
        </div>
        <Title level={3} className="!m-0 !text-white !tracking-tight">
          Do you want to restart task?
        </Title>

        <Paragraph className="!mt-2 !mb-6 !text-neutral-400">
          You can restart the same task or take a short break.
        </Paragraph>

        <Space size="middle">
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
