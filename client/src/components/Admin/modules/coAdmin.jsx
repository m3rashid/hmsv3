import { Table } from "antd";

import AdminWrapper from "components/Admin/adminWrapper";
import { columns } from "components/Admin/modules/helpers/table";
import useGetUserDetail from "components/Admin/modules/helpers/getUserDetail";
import { useEffect } from "react";

const CoAdmins = () => {
  const { getAllUsers, users, RefreshUserButton } = useGetUserDetail({
    userType: "coAdmins",
    userRole: "CO_ADMIN",
  });

  useEffect(() => {
    getAllUsers().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminWrapper aside={<RefreshUserButton />}>
      <Table
        rowKey={(record) => record.id}
        className="user-table"
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

export default CoAdmins;
