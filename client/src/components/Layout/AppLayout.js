import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout, Typography, Col, Button, Menu } from "antd";

import AuthModal from "../Modal/AuthModal";
import styles from "./layout.module.less";

function Index(props) {
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const MenuRoutes = [
    {
      text: "Home",
      path: "/",
    },
    {
      text: "Receptionists",
      path: "/reception",
    },
    {
      text: "Doctors",
      path: "/doctor",
    },
    {
      text: "Patients",
      path: "/patient",
    },
    {
      text: "Appointments",
      path: "/appointments",
    },
    {
      isGroup: true,
      text: "Admin",
      path: "/admin",
      children: [
        {
          text: "Home",
          path: "/home",
        },
        {
          text: "Receptionists",
          path: "/receptionists",
        },
        {
          text: "Doctors",
          path: "/doctors",
        },
        {
          text: "Patients",
          path: "/patients",
        },
      ],
    },
  ];

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
              {MenuRoutes.map((route, index) => {
                if (route.isGroup) {
                  return (
                    <Menu.SubMenu key={index} title={route.text}>
                      {route.children.map((child, i) => {
                        return (
                          <Menu.Item key={`${index}_${i}`}>
                            <Link to={`${route.path}${child.path}`}>
                              {child.text}
                            </Link>
                          </Menu.Item>
                        );
                      })}
                    </Menu.SubMenu>
                  );
                }

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
