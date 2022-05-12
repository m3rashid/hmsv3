import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout, Typography, Col, Button, Menu } from "antd";

import AuthModal from "../Modal/AuthModal";
import styles from "./layout.module.less";
import routes from "../../routes";

function Index(props) {
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <React.Fragment>
      <Layout className={styles.layout}>
        <Layout.Header theme="light">
          <Col className={styles.header}>
            <Col span={18}>
              <Typography.Title level={3}>
                <img
                  src="/images/logo.jpg"
                  alt="null"
                  className={styles.image}
                  onClick={() => {
                    handleClick();
                  }}
                />
                Dr. M.A Ansari Hospital
              </Typography.Title>
            </Col>
            <Col span={3} className={styles.theme}>
              <Button onClick={() => setIsModalVisible(true)}>Login</Button>
              <AuthModal
                isModalVisible={isModalVisible}
                handleOk={() => {
                  setIsModalVisible(true);
                }}
                handleCancel={() => {
                  setIsModalVisible(false);
                }}
              />
            </Col>
          </Col>
        </Layout.Header>
        <Layout>
          <Layout.Sider>
            <Menu theme="dark" mode="inline">
              {routes.map((route, index) => (
                <Menu.Item key={`${index}`}>
                  <Link to={route.path}>{route.text}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Layout.Sider>
          <Layout.Content className={styles.content}>
            {props.children}
          </Layout.Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
}

export default Index;
