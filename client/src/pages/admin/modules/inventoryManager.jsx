import React from "react";
import { Table } from "antd";

import { columns } from "./helpers/table";
import useGetUserDetail from "./helpers/getUserDetail";

const InventoryManagers = () => {
  const { getAllUsers, users } = useGetUserDetail({
    userType: "inventoryManagers",
    userRole: "INVENTORY_MANAGER",
  });

  React.useEffect(() => {
    getAllUsers().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ marginTop: "10px", marginLeft: "0px" }}>
      <Table
        dataSource={users}
        columns={columns}
        pagination={{
          total: users.length,
          defaultPageSize: 5,
        }}
      />
    </div>
  );
};

export default InventoryManagers;
