import { Segmented, Card } from "antd";

const TaskFilter = ({
  filter,
  setFilter,
}) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <Segmented
        block
        size="large"
        options={[
          "All",
          "Pending",
          "Completed",
        ]}
        value={filter}
        onChange={setFilter}
      />
    </Card>
  );
};

export default TaskFilter;