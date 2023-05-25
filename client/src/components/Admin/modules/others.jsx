import { useEffect } from 'react';
import { Table } from 'antd';

import AdminWrapper from 'components/Admin/adminWrapper';
import { columns } from 'components/Admin/modules/helpers/table';
import useGetUserDetail from 'components/Admin/modules/helpers/getUserDetail';
import useTableStyles from 'components/common/tableDefaults';

const Others = () => {
  const { tableStyles } = useTableStyles();
  const { getAllUsers, users, RefreshUserButton } = useGetUserDetail({
    userType: 'others',
    userRole: 'OTHER',
  });

  useEffect(() => {
    getAllUsers().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminWrapper aside={<RefreshUserButton />}>
      <Table
        rowKey={(record) => record.id}
        style={{ ...tableStyles }}
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

export default Others;
