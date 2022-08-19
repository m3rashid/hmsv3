import React from "react";
import { Table } from "antd";
import { useRecoilState } from "recoil";

import { columns, formatForTable } from "./table.helpers";
import { adminState } from "../../../atoms/admin";
import { instance } from "../../../api/instance";

const Others = () => {
  const [adminData, setAdminData] = useRecoilState(adminState);

  const getAllOthers = async () => {
    try {
      if (adminData.others.length !== 0) return;

      const res = await instance.post("/admin/all", {
        userRole: "OTHER",
      });

      const users = formatForTable(res.data.users);
      console.table(users);
      setAdminData((prev) => ({ ...prev, others: users }));
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getAllOthers().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
