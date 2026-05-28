import { Modal, Button, Space, Typography } from "antd";

const { Title, Paragraph } = Typography;

const BreakModal = ({ open, handleNextTask, handleTakeBreak }) => {
  return (
    <Modal open={open} footer={null} centered closable={false}>
      <div className="text-center py-6 px-2">
        <div className="mx-auto h-12 w-12 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center mb-5 text-2xl">
          🎉
        </div>
        <Title level={3} className="!m-0 !text-white !tracking-tight">
          Great work
        </Title>

        <Paragraph className="!mt-2 !mb-6 !text-neutral-400">
          What do you want to do next?
        </Paragraph>

        <Space size="middle">
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
