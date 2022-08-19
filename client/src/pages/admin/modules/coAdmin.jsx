import React from "react";
import { Table } from "antd";
import { useRecoilState } from "recoil";

import { columns, formatForTable } from "./table.helpers";
import { adminState } from "../../../atoms/admin";
import { instance } from "../../../api/instance";

const CoAdmins = () => {
  const [adminData, setAdminData] = useRecoilState(adminState);

  const getAllCoAdmins = async () => {
    try {
      if (adminData.coAdmins.length !== 0) return;

      const res = await instance.post("/admin/all", {
        userRole: "CO_ADMIN",
      });

      const users = formatForTable(res.data.users);
      console.table(users);
      setAdminData((prev) => ({ ...prev, coAdmins: users }));
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getAllCoAdmins().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
