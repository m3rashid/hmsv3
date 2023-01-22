import { Tabs } from "antd";

import Active from "components/Appointments/active";
import Completed from "components/Appointments/completed";

const Appointments = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Tabs
        defaultActiveKey="1"
        items={[
          { key: "1", tab: "Active", children: <Active /> },
          { key: "2", tab: "Completed", children: <Completed /> },
        ]}
      />
    </div>
  );
};

export default Appointments;
