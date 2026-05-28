import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const FocusHeader = ({ taskName }) => {
  return (
    <div className="text-center mb-8">
      <Paragraph className="!m-0 !text-[11px] uppercase tracking-[0.18em] !text-neutral-500 font-medium">
        Current Focus Task
      </Paragraph>
      <Title
        level={1}
        className="!mt-3 !mb-0 !text-white !tracking-tight !text-3xl md:!text-4xl !font-semibold"
      >
        {taskName}
      </Title>
    </div>
  );
};

export default FocusHeader;
