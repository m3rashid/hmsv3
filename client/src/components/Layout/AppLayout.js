import React from "react";
import { useRecoilState } from "recoil";
import { useNavigate, Link } from "react-router-dom";
import { Layout, Typography, Col, Menu } from "antd";

import UserTop from "./userTop";
import styles from "./layout.module.less";
import { authState } from "../../atoms/auth";
import routes, { checkAccess } from "../../routes";

function Index(props) {
  const navigate = useNavigate();
  const [Auth, setAuth] = useRecoilState(authState);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Layout className={styles.layout}>
      <Layout.Header>
        <Col className={styles.header}>
          <Col span={12}>
            <Typography.Title level={3}>
              <img
                src="/images/logo.jpg"
                alt="null"
                className={styles.image}
                onClick={handleClick}
              />
              Dr. M.A Ansari Health Centre
            </Typography.Title>
          </Col>

          <Col className={styles.theme}>
            <UserTop {...{ Auth, setAuth }} />
          </Col>
        </Col>
      </Layout.Header>
      <Layout>
        <Layout.Sider>
          <Menu theme="dark" mode="inline">
            <Menu.Item key="/index/home/">
              <Link to="/">Home</Link>
            </Menu.Item>
            {routes.map((route, index) => {
              if (!checkAccess(Auth, route)) return null;
              if (route?.showInNav === false) return null;
              return (
                <Menu.Item key={`${index}-=-${route.path}-=-${route.text}`}>
                  <Link to={route.path}>{route.text}</Link>
                </Menu.Item>
              );
            })}

            <Menu.Item
              key="/index/about"
              style={{ position: "absolute", bottom: 0 }}
            >
              <Link to="/about">About</Link>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Layout.Content className={styles.content}>
          {props.children}
        </Layout.Content>
      </Layout>
      <Layout.Footer className={styles.footer}>
        <p style={{ textAlign: "center" }}>
          Project Designed and Developed in-house under Dept. of Computer
          Science, Faculty of Engineering and Technology, Jamia Millia Islamia
          <Link style={{ marginLeft: "10px" }} to="/about">
            Know More . . .
          </Link>
        </p>
      </Layout.Footer>
    </Layout>
  );
}

export default Index;
