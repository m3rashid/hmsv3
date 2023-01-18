import { useRecoilState } from "recoil";
import { useNavigate, Link } from "react-router-dom";
import { Layout, Typography, Menu, theme, Divider } from "antd";

import { authState } from "atoms/auth";
import routes, { checkAccess } from "routes";
import UserTop from "components/Layout/userTop";

const darkColor = "#484C56";
const lightColor = "#F9F9FB";

const AppLayout = ({ children }) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const [Auth, setAuth] = useRecoilState(authState);

  const handleClick = () => {
    navigate("/");
  };

  const commonLinkContainerStyles = { paddingLeft: 24, paddingRight: 16 };
  const commonLinkStyles = { color: "#ffffff" };

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
              onClick={handleClick}
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
          <Menu mode="inline" style={{ background: darkColor }}>
            {!Auth.isLoggedIn && (
              <Menu.Item key="/index/home/">
                <Link style={commonLinkStyles} to="/">
                  Home
                </Link>
              </Menu.Item>
            )}
            {routes.map((route, index) => {
              if (!checkAccess(Auth, route)) return null;
              if (route?.showInNav === false) return null;
              return (
                <Menu.Item key={`${index}-=-${route.path}-=-${route.text}`}>
                  <Link style={commonLinkStyles} to={route.path}>
                    {route.text}
                  </Link>
                </Menu.Item>
              );
            })}

            <Divider
              dashed
              style={{
                background: token.colorFillSecondary,
                marginBottom: 10,
                marginTop: 10,
              }}
            />
            <Menu.Item key="/index/learn" style={commonLinkContainerStyles}>
              <Link to="/learn" style={commonLinkStyles}>
                Documentaion
              </Link>
            </Menu.Item>

            <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
              <Menu.Item key="/index/about" style={commonLinkContainerStyles}>
                <Link style={commonLinkStyles} to="/about">
                  About
                </Link>
              </Menu.Item>
            </div>
          </Menu>
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
