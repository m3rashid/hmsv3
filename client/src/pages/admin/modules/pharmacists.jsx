import React from "react";
import { Table } from "antd";
import { useRecoilState } from "recoil";

import { columns, formatForTable } from "./table.helpers";
import { adminState } from "../../../atoms/admin";
import { instance } from "../../../api/instance";

const Pharmacists = () => {
  const [adminData, setAdminData] = useRecoilState(adminState);

  const getAllPharmacists = async () => {
    try {
      if (adminData.pharmacists.length !== 0) return;

      const res = await instance.post("/admin/all", {
        userRole: "PHARMACIST",
      });

      const users = formatForTable(res.data.users);
      console.table(users);
      setAdminData((prev) => ({ ...prev, pharmacists: users }));
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getAllPharmacists().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ marginTop: "10px", marginLeft: "0px" }}>
      <Table
        dataSource={adminData.pharmacists}
        columns={columns}
        pagination={{
          total: adminData.pharmacists.length,
          defaultPageSize: 5,
        }}
      />
    </div>
  );
};

export default Pharmacists;
