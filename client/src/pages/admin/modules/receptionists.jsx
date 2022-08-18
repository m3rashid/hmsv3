import React from "react";
import { useRecoilState } from "recoil";
import { Table } from "antd";

import { instance } from "../../../api/instance";
import { adminState } from "../../../atoms/admin";
import { columns, formatForTable } from "./table.helpers";

const Receptionists = () => {
  const [adminData, setAdminData] = useRecoilState(adminState);

  const getAllReceptionists = async () => {
    try {
      if (adminData.receptionists.length !== 0) return;

      const res = await instance.post("/admin/all", {
        userRole: "RECEPTIONIST",
      });

      const users = formatForTable(res.data.users);
      console.table(users);
      setAdminData((prev) => ({ ...prev, receptionists: users }));
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getAllReceptionists().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ marginTop: "10px" }}>
      <Table
        dataSource={adminData.receptionists}
        columns={columns}
        pagination={{
          total: adminData.receptionists.length,
          defaultPageSize: 5,
        }}
      />
    </div>
  );
};

export default Receptionists;
