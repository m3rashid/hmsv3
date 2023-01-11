import { useEffect } from "react";
import { Table } from "antd";

import AdminWrapper from "components/Admin/adminWrapper";
import { columns } from "components/Admin/modules/helpers/table";
import useGetUserDetail from "components/Admin/modules/helpers/getUserDetail";

const Receptionists = () => {
  const { getAllUsers, users, RefreshUserButton } = useGetUserDetail({
    userType: "receptionists",
    userRole: "RECEPTIONIST",
  });

  useEffect(() => {
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

export default Receptionists;
