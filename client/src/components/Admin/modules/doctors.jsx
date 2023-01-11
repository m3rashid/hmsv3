import { useEffect } from "react";
import { Table } from "antd";

import AdminWrapper from "components/Admin/adminWrapper";
import { columns } from "components/Admin/modules/helpers/table";
import useGetUserDetail from "components/Admin/modules/helpers/getUserDetail";

const Doctors = () => {
  const { getAllUsers, users, RefreshUserButton } = useGetUserDetail({
    userType: "doctors",
    userRole: "DOCTOR",
  });

  useEffect(() => {
    getAllUsers().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminWrapper aside={<RefreshUserButton />}>
      <Table
        size="small"
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

export default Doctors;
