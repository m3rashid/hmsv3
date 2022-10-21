import React from "react";
import { Tabs, Typography } from "antd";

import styles from "pages/inventory/style.module.css";
import AddNewInventory from "components/Inventory/AddNew";
import InventoryDisplay from "components/Inventory/Display";

const { TabPane } = Tabs;

function Inventory() {
  return (
    <div className={styles.container}>
      <Typography.Title level={4}>Inventory Management System</Typography.Title>

      <Tabs>
        <TabPane tab="Inventory Show" key="1">
          <InventoryDisplay />
        </TabPane>
        <TabPane tab="Inventory Add" key="2">
          <AddNewInventory />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Inventory;
