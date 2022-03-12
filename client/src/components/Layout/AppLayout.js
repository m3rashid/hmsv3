import React, { useState } from "react";
import {
  Layout,
  Typography,
  Col,
  Button,
  Menu
} from "antd";
import AuthModal from "../Modal/AuthModal";
import styles from "./layout.module.less";


/**
 *
 * @param {*} props
 * @returns {JSX.Element}
 */
function Index(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const MenuRoutes = [
    {
      text: "Receptionists",
      path: "/receptionists"
    },
    {
      text: "Doctors",
      path: "/doctors"
    },
    {
      text: "Patients",
      path: "/patients"
    },
    {
      text: "Appointments",
      path: "/appointments"
    },
    {
      isGroup: true,
      text: "Admin",
      path: "/admin/",
      children: [
        {
          text: "Receptionists",
          path: "/receptionists"
        },
        {
          text: "Doctors",
          path: "/doctors"
        },
        {
          text: "Patients",
          path: "/patients"
        }
      ]
    }
  ]

  return (
    <React.Fragment>
      <Layout className={styles.layout}>
        <Layout.Header theme="light">
          <Col className={styles.header}>
            <Col span={18}>
              <Typography.Title level={3}>
                Dr. M.A Ansari Hospital
              </Typography.Title>
            </Col>
            <Col span={3}
              className={styles.theme}
            >
              <Button onClick={() => setIsModalVisible(true)} >Login</Button>
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
            <Menu
              theme="dark"
              mode="inline"
            >
              {MenuRoutes.map((route, index) => {

                if (route.isGroup) {
                  return (
                    <Menu.SubMenu key={index} title={route.text}>
                      {route.children.map((child, i) => {
                        return (
                          <Menu.Item key={`${index}_${i}`}>
                            {child.text}
                          </Menu.Item>
                        )
                      })}
                    </Menu.SubMenu>
                  )
                }

                return (
                  <Menu.Item key={`${index}`}>
                    {route.text}
                  </Menu.Item>
                )
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
