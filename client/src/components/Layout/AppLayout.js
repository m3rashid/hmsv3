import { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Layout, Typography, Menu, theme } from "antd";

import { authState } from "atoms/auth";
import routes, { checkAccess } from "routes";
import UserTop from "components/Layout/userTop";
import {
  BookOutlined,
  HomeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const darkColor = "#484C56";
const lightColor = "#F9F9FB";

const AppLayout = ({ children }) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [Auth, setAuth] = useRecoilState(authState);
  const [currentMenuItem, setCurrentMenuItem] = useState(pathname);

  const items = [
    !Auth.isLoggedIn && {
      key: "/",
      icon: <HomeOutlined />,
      label: "Home",
    },
    ...routes.reduce((acc, route) => {
      if (route?.showInNav === false || !checkAccess(Auth, route)) return acc;
      return [
        ...acc,
        {
          key: route.path,
          icon: route.icon,
          label: route.text,
        },
      ];
    }, []),
    {
      key: "/learn",
      icon: <BookOutlined />,
      label: "Documentation",
    },
    {
      key: "/about",
      icon: <FileTextOutlined />,
      label: "About",
    },
  ].reduce(
    (acc, it) => [
      ...acc,
      {
        ...it,
        style: {
          color: "#F9F9FB",
          ...(currentMenuItem === it.key && { background: "#00BDC1" }),
        },
      },
    ],
    []
  );

  const handleMenuChange = ({ key }) => {
    setCurrentMenuItem(key);
    navigate(key);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Layout.Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          background: darkColor,
          color: "white",
          boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ marginTop: 16 }}>
          <Typography.Title level={3} style={{ color: "white" }}>
            <img
              src="/images/logo.jpg"
              alt="null"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "100%",
                marginRight: "10px",
                padding: "2px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            />
            Dr. M.A Ansari Health Centre
          </Typography.Title>
        </div>

        <UserTop {...{ Auth, setAuth }} />
      </Layout.Header>

      <Layout>
        <Layout.Sider
          style={{
            background: darkColor,
            boxShadow: "2px 0px 5px 0px rgba(0,0,0,0.3)",
          }}
        >
          <Menu
            mode="inline"
            style={{ background: darkColor }}
            items={items}
            onClick={handleMenuChange}
          />
        </Layout.Sider>

        <Layout.Content style={{ overflowY: "auto", background: lightColor }}>
          {children}
          <p style={{ textAlign: "center" }}>
            Project Designed and Developed in-house under Dept. of CSE
            (FET-JMI),
            <Link
              style={{ marginLeft: "10px", color: token.colorPrimary }}
              to="/about"
            >
              Know More . . .
            </Link>
          </p>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
