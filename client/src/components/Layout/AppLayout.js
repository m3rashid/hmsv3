import {
  BookOutlined,
  HomeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Fragment, useState } from "react";
import { Layout, Typography, Menu, theme } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { authState } from "atoms/auth";
import { configState } from "atoms/config";
import routes, { checkAccess } from "routes";
import UserTop from "components/Layout/userTop";
import ErrorBoundary from "pages/errorBoundary";
import { uiState } from "atoms/ui";

const AppLayout = ({ children }) => {
  const config = useRecoilValue(configState);
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [ui, setUi] = useRecoilState(uiState);
  const [Auth, setAuth] = useRecoilState(authState);
  const [currentMenuItem, setCurrentMenuItem] = useState(pathname);

  const items = [
    ...(!Auth.isLoggedIn
      ? [
          {
            key: "/",
            icon: <HomeOutlined />,
            label: config.sidebar_keymaps["home"],
          },
        ]
      : []),
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
  ].map((it) => ({
    ...it,
    style: {
      color: config.app_light_color,
      ...(currentMenuItem === it.key && {
        background: config.app_theme_color,
      }),
    },
  }));

  const handleMenuChange = ({ key }) => {
    setCurrentMenuItem(key);
    navigate(key);
  };

  return (
    <Fragment>
      <Layout>
        <Layout.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: ui.isMobile ? "5px" : "12px",
            paddingLeft: ui.isMobile ? "5px" : "20px",
            paddingRight: ui.isMobile ? "5px" : "20px",
            background: config.app_dark_color,
            color: "white",
            boxShadow: "-5px 0px 10px -15px rgba(0,0,0,0.3)",
            zIndex: 10,
          }}
        >
          <Typography.Title
            level={4}
            style={{ color: "white", marginTop: ui.isMobile ? 5 : 16 }}
          >
            <img
              src="/images/logo.jpg"
              alt="null"
              style={{
                width: 40,
                height: 40,
                borderRadius: "100%",
                marginRight: "10px",
                padding: "2px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            />
            {config.app_name}
          </Typography.Title>

          <UserTop {...{ Auth, setAuth }} />
        </Layout.Header>
      </Layout>

      <Layout style={{ height: "calc(100vh - 64px)" }}>
        <Layout.Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            background: config.app_dark_color,
            boxShadow: "2px 0px 5px 0px rgba(0,0,0,0.3)",
          }}
          zeroWidthTriggerStyle={{ marginTop: -64 }}
          onCollapse={(v) => setUi((p) => ({ ...p, sidebarCollapsed: v }))}
        >
          <Menu
            mode="inline"
            style={{ background: config.app_dark_color }}
            items={items}
            onClick={handleMenuChange}
          />
        </Layout.Sider>

        <Layout>
          <Layout.Content
            style={{ overflowY: "auto", background: config.app_light_color }}
          >
            <ErrorBoundary>{children}</ErrorBoundary>
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
    </Fragment>
  );
};

export default AppLayout;
