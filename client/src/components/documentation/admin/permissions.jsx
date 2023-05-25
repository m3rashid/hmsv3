import { List, Table, Typography } from 'antd';
import React, { Fragment } from 'react';
import { allPermissions } from 'utils/constants';
import { toSentenceCase } from 'utils/strings';

const AllPermissions = () => {
  return (
    <Fragment>
      <Typography.Title level={4}>Default Permissions</Typography.Title>
      <List>
        <List.Item>
          The default permissions defined to the roles are intuitive and self explanatory
        </List.Item>
        <List.Item>
          The admin has full powers to modify any user&apos;s roles at runtime which would be
          effective immediately at the next page refresh
        </List.Item>
        <List.Item>
          Default Permissions are given to the users and the roles are just a label to the
          collection of those default permissions
        </List.Item>
      </List>

      <br />
      <br />

      <Typography.Title level={4}>List of all Permissions Available</Typography.Title>
      <Table
        size="small"
        pagination={false}
        style={{ marginBottom: 20 }}
        rowKey={(rec) => `${rec.name}`}
        columns={[
          {
            key: 'name',
            title: 'Permission Name',
            dataIndex: 'name',
            render: (text) => (
              <Typography.Text>
                {text
                  .split('_')
                  .map((p) => toSentenceCase(p))
                  .join(' ')}
              </Typography.Text>
            ),
          },
          {
            key: 'description',
            title: 'Description',
            dataIndex: 'description',
          },
        ]}
        dataSource={Object.values(allPermissions)}
      />
    </Fragment>
  );
};

export default AllPermissions;
