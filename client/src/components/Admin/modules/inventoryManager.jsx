import React from "react";
import { Table } from "antd";

import AdminWrapper from "components/Admin/adminWrapper";
import { columns } from "components/Admin/modules/helpers/table";
import useGetUserDetail from "components/Admin/modules/helpers/getUserDetail";

const InventoryManagers = () => {
  const { getAllUsers, users, RefreshUserButton } = useGetUserDetail({
    userType: "inventoryManagers",
    userRole: "INVENTORY_MANAGER",
  });

  React.useEffect(() => {
    getAllUsers().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminWrapper aside={<RefreshUserButton />}>
      <Table
        dataSource={users}
        columns={columns}
        pagination={{
          total: users.length,
          defaultPageSize: 5,
        }}
      />
    </AdminWrapper>
  );
};

export default InventoryManagers;
