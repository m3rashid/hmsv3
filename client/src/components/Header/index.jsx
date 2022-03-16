import React from "react";
import { PageHeader, Badge, Card, Row, Col } from "antd";

const Header = ({ title, user, subTitle }) => {
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={title}
        subTitle={subTitle}
        // extra={[
        //   <Button key="3">Operation</Button>,
        //   <Button key="2">Operation</Button>,
        //   <Button key="1" type="primary">
        //     Primary
        //   </Button>,
        // ]}
      >
        <Row>
          <Col span={12}>
            {user && (
              <Badge.Ribbon
                color={user.online ? "green" : "gray"}
                text={user.online ? "Online" : "Offline"}
              >
                <Card title={user.name} size="small">
                  Email: {user.email}
                </Card>
              </Badge.Ribbon>
            )}
          </Col>
          <Col span={12}></Col>
        </Row>
      </PageHeader>
    </div>
  );
};

export default Header;
