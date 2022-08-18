import React from "react";
import { Table } from "antd";
import { useRecoilState } from "recoil";

import { columns } from "./table.helpers";
import { adminState } from "../../../atoms/admin";

const CoAdmins = () => {
  const [adminData, setAdminData] = useRecoilState(adminState);

  return (
    <div style={{ marginTop: "10px", marginLeft: "0px" }}>
      <Table
        dataSource={adminData.coAdmins}
        columns={columns}
        pagination={{
          total: adminData.coAdmins.length,
          defaultPageSize: 5,
        }}
      />
    </div>
  );
};

export default CoAdmins;
