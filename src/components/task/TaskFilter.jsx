import { Segmented } from "antd";

const TaskFilter = ({ filter, setFilter }) => {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#111111] p-3">
      <Segmented
        block
        size="large"
        options={["All", "Pending", "Completed"]}
        value={filter}
        onChange={setFilter}
      />
    </div>
  );
};

export default TaskFilter;
