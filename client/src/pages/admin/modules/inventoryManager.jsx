import React from "react";
import { Table } from "antd";
import { useRecoilState } from "recoil";

import { instance } from "../../../api/instance";
import { adminState } from "../../../atoms/admin";
import { columns, formatForTable } from "./helpers/table";

const InventoryManagers = () => {
  const [adminData, setAdminData] = useRecoilState(adminState);

  const getAllInventoryManagers = async () => {
    try {
      if (adminData.inventoryManagers.length !== 0) return;

      const res = await instance.post("/admin/all", {
        userRole: "INVENTORY_MANAGER",
      });

      const users = formatForTable(res.data.users);
      console.table(users);
      setAdminData((prev) => ({ ...prev, inventoryManagers: users }));
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getAllInventoryManagers().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ marginTop: "10px", marginLeft: "0px" }}>
      <Table
        dataSource={adminData.inventoryManagers}
        columns={columns}
        pagination={{
          total: adminData.inventoryManagers.length,
          defaultPageSize: 5,
        }}
      />
    </div>
  );
};

export default InventoryManagers;
