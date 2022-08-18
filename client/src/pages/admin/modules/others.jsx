import React from "react";
import { Table } from "antd";
import { useRecoilState } from "recoil";

import { columns } from "./table.helpers";
import { adminState } from "../../../atoms/admin";

const Others = () => {
  const [adminData, setAdminData] = useRecoilState(adminState);

  return (
    <div style={{ marginTop: "10px", marginLeft: "0px" }}>
      <Table
        dataSource={adminData.others}
        columns={columns}
        pagination={{
          total: adminData.others.length,
          defaultPageSize: 5,
        }}
      />
    </div>
  );
};

export default Others;
