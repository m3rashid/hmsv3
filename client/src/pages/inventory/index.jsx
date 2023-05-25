import { Tabs, Typography } from "antd";

import styles from "pages/inventory/style.module.css";
import AddNewInventory from "components/Inventory/AddNew";
import InventoryDisplay from "components/Inventory/Display";

function Inventory() {
  return (
    <div className={styles.container}>
      <Typography.Title level={4}>Inventory Management System</Typography.Title>

      <Tabs
        centered
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Inventory Show",
            children: <InventoryDisplay />,
          },
          {
            key: "2",
            label: "Inventory Add",
            children: <AddNewInventory />,
          },
        ]}
      />
    </div>
  );
}

export default Inventory;
