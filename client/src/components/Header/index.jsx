import React from "react";
import { PageHeader, Badge, Card, Row, Col } from "antd";

const Header = ({ title, user, subTitle, avatar }) => {
  const Avatar = `/images/${avatar}.jpg`;
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={title}
        subTitle={subTitle}
        avatar={{ src: `${Avatar}` }}
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
              <Badge.Ribbon color="green" text="Online">
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
