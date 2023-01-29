import { useRecoilValue } from 'recoil';
import { Fragment, useState } from 'react';
import { Button, Popover, Space, Typography } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

import AuthModal from 'components/Modal/AuthModal';
import LogoutModal from 'components/Modal/logoutModal';
import { configState } from 'atoms/config';

const UserTop = ({ Auth, setAuth }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const config = useRecoilValue(configState);

  console.log({ config });

  if (Auth.isLoggedIn) {
    return (
      <Space>
        <Popover
          title={<Typography.Text>{Auth.user.name} is Logged in</Typography.Text>}
          content={
            <Fragment>
              <Typography.Text disabled>EMAIL : {Auth.user.email}</Typography.Text>
              <br />
              <Typography.Text disabled>ROLE : {Auth.user.profile?.role}</Typography.Text>
            </Fragment>
          }
          placement="leftBottom"
          style={{
            background: config.app_dark_color,
          }}
        >
          <UserOutlined />
        </Popover>
        <Button type="primary" onClick={() => setIsModalVisible(true)} icon={<LogoutOutlined />} />
        <LogoutModal {...{ isModalVisible, setAuth, setIsModalVisible }} />
      </Space>
    );
  }

  return (
    <>
      <Button onClick={() => setIsModalVisible(true)}>Login</Button>
      <AuthModal
        isModalVisible={isModalVisible}
        handleCancel={() => {
          setIsModalVisible(false);
        }}
      />
    </>
  );
};

export default UserTop;
