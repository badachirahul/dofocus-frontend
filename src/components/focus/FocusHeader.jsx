import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const FocusHeader = ({ taskName }) => {
  return (
    <div className="text-center mb-6">
      <Paragraph type="secondary">Current Focus Task</Paragraph>
      <Title level={1}>{taskName}</Title>
    </div>
  );
};

export default FocusHeader;
