import { Tabs, Typography } from "antd";

import styles from "pages/inventory/style.module.css";
import AddNewInventory from "components/Inventory/AddNew";
import InventoryDisplay from "components/Inventory/Display";

function Inventory() {
  return (
    <div className={styles.container}>
      <Typography.Title level={4}>Inventory Management System</Typography.Title>

      <Tabs
        items={[
          {
            key: "1",
            tab: "Inventory Show",
            children: <InventoryDisplay />,
          },
          {
            key: "2",
            tab: "Inventory Add",
            children: <AddNewInventory />,
          },
        ]}
      />
    </div>
  );
}

export default Inventory;
