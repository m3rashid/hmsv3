import { Button, Space, Table } from "antd";
import useTableStyles from "components/common/tableDefaults";
import { Fragment } from "react";

const Active = () => {
  const { tableStyles } = useTableStyles();
  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patient",
      key: "patient",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Doctor Name",
      dataIndex: "doctor",
      key: "doctor",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Date/Time",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button> Details </Button>
        </Space>
      ),
    },
  ];

  const data = [];

  return (
    <Fragment>
      <Table
        rowKey={(record) => record.id}
        style={{ ...tableStyles }}
        size="small"
        dataSource={data}
        columns={columns}
        pagination={{
          total: data.length,
          defaultPageSize: 5,
        }}
      />
    </Fragment>
  );
};

export default Active;
