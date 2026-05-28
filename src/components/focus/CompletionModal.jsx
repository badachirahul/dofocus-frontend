import { Modal, Button, Space, Typography } from "antd";

const { Title, Paragraph } = Typography;

const CompletionModal = ({
  open,
  handleTaskCompleted,
  handleTaskNotCompleted,
}) => {
  return (
    <Modal open={open} footer={null} centered closable={false}>
      <div className="text-center py-6 px-2">
        <div className="mx-auto h-12 w-12 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center mb-5 text-2xl">
          ⏱️
        </div>
        <Title level={3} className="!m-0 !text-white !tracking-tight">
          Did you complete the task?
        </Title>

        <Paragraph className="!mt-2 !mb-6 !text-neutral-400">
          Your focus timer has ended.
        </Paragraph>

        <Space size="middle">
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
