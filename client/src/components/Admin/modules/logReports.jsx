import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Button, Modal, Table } from 'antd';

import { toSentenceCase } from 'utils/strings';
import ShowEntry from 'components/common/showEntry';
import AdminWrapper from 'components/Admin/adminWrapper';
import useLogReports from 'components/Admin/modules/helpers/useLogReports';
import useTableStyles from 'components/common/tableDefaults';

const LogReports = () => {
  const { tableStyles } = useTableStyles();
  const {
    getLogs,
    allLogs,
    getDetails,
    handleCancel,
    handleOk,
    isModalVisible,
    details,
    refreshLogs,
  } = useLogReports();

  useEffect(() => {
    getLogs().then().catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text) =>
        text
          .split('_')
          .map((e) => toSentenceCase(e))
          .join(' '),
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => dayjs(text).format('DD-MM-YYYY hh:mm A'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => <Button onClick={() => getDetails(record)}>Details</Button>,
    },
  ];

  if (Object.keys(allLogs).length === 0) {
    return <AdminWrapper>No data</AdminWrapper>;
  }

  return (
    <AdminWrapper
      aside={
        <Button onClick={refreshLogs} style={{ marginBottom: '10px' }}>
          Refresh Log Reports
        </Button>
      }
    >
      <Table
        rowKey={(record) => record.id}
        style={{ ...tableStyles }}
        size="small"
        dataSource={allLogs}
        columns={columns}
        pagination={{ total: allLogs.length, defaultPageSize: 10 }}
      />
      <Modal
        title="Details"
        footer={null}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {Object.entries(details).map(([key, val]) => (
            <ShowEntry key={key} label={key} value={val} />
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            borderTop: '1px solid #f0f0f0',
            margin: '24px -24px -10px -24px',
            padding: '10px 24px 0 24px',
          }}
        >
          <Button style={{ marginRight: '10px' }} onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" onClick={handleCancel}>
            OK
          </Button>
        </div>
      </Modal>
    </AdminWrapper>
  );
};

export default LogReports;
