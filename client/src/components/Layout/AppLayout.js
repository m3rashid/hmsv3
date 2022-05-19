import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout, Typography, Col, Button, Menu, Space, Image } from "antd";

import AuthModal from "../Modal/AuthModal";
import styles from "./layout.module.less";
import routes, { validateRoute } from "../../routes";
import { useRecoilState } from "recoil";
import { authDefaultState, authState } from "../../atoms/auth";
import faker from "@faker-js/faker";
import { LogoutOutlined } from "@ant-design/icons";

function Index(props) {
  const navigate = useNavigate();
  const [Auth, setAuth] = useRecoilState(authState);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
    navigate("/");
  };

  const handleLogout = useCallback(() => {
    setAuth(authDefaultState);
  }, [setAuth]);

  return (
    <React.Fragment>
      <Layout className={styles.layout}>
        <Layout.Header>
          <Col className={styles.header}>
            <Col span={12}>
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
            <Col className={styles.theme}>
              {Auth.isLoggedIn ? (
                <>
                  <Space>
                    <Image
                      width={40}
                      height={40}
                      src={faker.image.abstract()}
                      preview={false}
                      style={{
                        borderRadius: "50%",
                      }}
                    />
                    <Typography.Text type="secondary" italic>
                      Welcome, Mohammad Sarfraz Alam
                    </Typography.Text>
                    <Button type="primary" onClick={() => handleLogout()}>
                      <LogoutOutlined />
                    </Button>
                  </Space>
                </>
              ) : (
                <>
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
                </>
              )}
            </Col>
          </Col>
        </Layout.Header>
        <Layout>
          <Layout.Sider>
            <Menu theme="dark" mode="inline">
              {routes.map((route, index) => {
                if (!validateRoute(Auth, route)) return null;
                return (
                  <Menu.Item key={`${index}`}>
                    <Link to={route.path}>{route.text}</Link>
                  </Menu.Item>
                );
              })}
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
