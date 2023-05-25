import AdminWrapper from 'components/Admin/adminWrapper';
import ProfileWrapper from 'components/Profile/ProfileWrapper';
import CreateUserModal from 'components/Admin/modules/helpers/createUserModal';
import DataMigrationInput from './helpers/data-migration';
import { Col, Row, Typography, message } from 'antd';
import AdminDashboard from './adminDashboard';
import { useEffect } from 'react';
import { socket } from 'api/instance';

const Home = () => {
  // useEffect(() => {
  //   socket.on('doctor-left', (data) => {
  //     message.success(`Doctor ${data?.name} left successfully!`);
  //   });
  //   return () => {
  //     socket.off('doctor-left');
  //   };
  // }, []);

  return (
    <ProfileWrapper>
      <AdminWrapper hideHeading>
        <AdminDashboard />
        <Row>
          <Col span={12} style={{ paddingRight: 15 }}>
            <Typography.Title level={4}>Admin Actions</Typography.Title>
            <CreateUserModal isEdit={false} />
          </Col>
          <Col span={12} style={{ paddingLeft: 15 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <DataMigrationInput />
            </div>
          </Col>
        </Row>
      </AdminWrapper>
    </ProfileWrapper>
  );
};

export default Home;
