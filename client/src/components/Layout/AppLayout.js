import { useRecoilState } from "recoil";
import { useNavigate, Link } from "react-router-dom";
import { Layout, Typography, Menu } from "antd";

import { authState } from "atoms/auth";
import routes, { checkAccess } from "routes";
import UserTop from "components/Layout/userTop";

const darkColor = "#484C56";
const lightColor = "#F9F9FB";

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const [Auth, setAuth] = useRecoilState(authState);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Layout.Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          background: darkColor,
          color: "white",
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
        <Layout.Sider theme="light" style={{ background: darkColor }}>
          <Menu mode="inline" style={{ background: darkColor }}>
            <Menu.Item key="/index/home/">
              <Link style={{ color: "#ffffff" }} to="/">
                Home
              </Link>
            </Menu.Item>
            {routes.map((route, index) => {
              if (!checkAccess(Auth, route)) return null;
              if (route?.showInNav === false) return null;
              return (
                <Menu.Item key={`${index}-=-${route.path}-=-${route.text}`}>
                  <Link style={{ color: "#ffffff" }} to={route.path}>
                    {route.text}
                  </Link>
                </Menu.Item>
              );
            })}
            <Menu.Item
              key="/index/about"
              style={{ position: "absolute", bottom: 0 }}
            >
              <Link style={{ color: "#ffffff" }} to="/about">
                About
              </Link>
            </Menu.Item>
          </Menu>
        </Layout.Sider>

        <Layout.Content style={{ overflowY: "auto", background: lightColor }}>
          {children}
          <p style={{ textAlign: "center" }}>
            Project Designed and Developed in-house under Dept. of CSE
            (FET-JMI),
            <Link style={{ marginLeft: "10px" }} to="/about">
              Know More . . .
            </Link>
          </p>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
