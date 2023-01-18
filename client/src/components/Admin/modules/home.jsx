import AdminWrapper from "components/Admin/adminWrapper";
import ProfileWrapper from "components/Profile/ProfileWrapper";
import CreateUserModal from "components/Admin/modules/helpers/createUserModal";
import DataMigrationInput from "./helpers/data-migration";
import { Col, Row, Typography } from "antd";
import AdminDashboard from "./adminDashboard";

const Home = () => {
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
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
