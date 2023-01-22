import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Layout, Typography, Menu, theme } from "antd";

import { authState } from "atoms/auth";
import { configState } from "atoms/config";
import routes, { checkAccess } from "routes";
import UserTop from "components/Layout/userTop";
import {
  BookOutlined,
  HomeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const AppLayout = ({ children }) => {
  const config = useRecoilValue(configState);
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [Auth, setAuth] = useRecoilState(authState);
  const [currentMenuItem, setCurrentMenuItem] = useState(pathname);

  const items = [
    !Auth.isLoggedIn && {
      key: "/",
      icon: <HomeOutlined />,
      label: config.sidebar_keymaps["home"],
    },
    ...routes.reduce((acc, route) => {
      if (route?.showInNav === false || !checkAccess(Auth, route)) return acc;
      return [
        ...acc,
        {
          key: route.path,
          icon: route.icon,
          label: config.sidebar_keymaps[route.text],
        },
      ];
    }, []),
    {
      key: "/learn",
      icon: <BookOutlined />,
      label: config.sidebar_keymaps["documentation"],
    },
    {
      key: "/about",
      icon: <FileTextOutlined />,
      label: config.sidebar_keymaps["about"],
    },
  ].reduce((acc, it) => {
    if (!it) return acc;
    return [
      ...acc,
      {
        ...it,
        style: {
          color: config.app_light_color,
          ...(currentMenuItem === it.key && {
            background: config.app_theme_color,
          }),
        },
      },
    ];
  }, []);

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
          background: config.app_dark_color,
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
            {config.app_name}
          </Typography.Title>
        </div>

        <UserTop {...{ Auth, setAuth }} />
      </Layout.Header>

      <Layout>
        <Layout.Sider
          style={{
            background: config.app_dark_color,
            boxShadow: "2px 0px 5px 0px rgba(0,0,0,0.3)",
          }}
        >
          <Menu
            mode="inline"
            style={{ background: config.app_dark_color }}
            items={items}
            onClick={handleMenuChange}
          />
        </Layout.Sider>

        <Layout.Content
          style={{ overflowY: "auto", background: config.app_light_color }}
        >
          {children}
          <p style={{ textAlign: "center" }}>
            {config.footer_text},
            <Link
              style={{ marginLeft: "10px", color: token.colorPrimary }}
              to="/about"
            >
              {config.footer_link_text}
            </Link>
          </p>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
