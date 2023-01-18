import "@ant-design/flowchart/dist/index.css";
import "antd/dist/reset.css";
import "./index.css";
import enUs from "antd/locale/en_US";
import { ConfigProvider } from "antd";
import { useRecoilState } from "recoil";
import { Routes, Route } from "react-router-dom";
import { createContext, useCallback, useEffect, useState } from "react";

import Home from "pages/home";
import About from "pages/about";
import UnAuthPage from "pages/unAuthenticated";

import { socket } from "api/instance";
import { authState } from "atoms/auth";
import { instance } from "api/instance";
import antDesignTheme from "styles/theme";
import routes, { checkAccess } from "routes";
import Loading from "components/Loading/Loading";
import AppLayout from "components/Layout/AppLayout";
import { revalidateJWT } from "api/auth/revalidateJWT";
import useFetchSockets from "components/Sockets/useFetchSockets";

export const SocketContext = createContext();

function App() {
  useFetchSockets();
  const [Auth, setAuth] = useRecoilState(authState);
  const [isLoading, setIsLoading] = useState(true);

  const revalidate = useCallback(async () => {
    setTimeout(() => {
      revalidateJWT(setAuth)
        .then((res) => {
          socket.io.opts.auth.token = res.token;
          socket.disconnect().connect();
        })
        .catch(console.log)
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  }, [setAuth]);

  useEffect(() => {
    revalidate();
  }, [revalidate]);

  useEffect(() => {
    if (Auth.isLoggedIn) {
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${Auth.token}`;
    }
  }, [Auth]);

  if (isLoading) return <Loading text="App is Loading . ." />;
  return (
    <ConfigProvider theme={antDesignTheme} locale={enUs}>
      <AppLayout>
        <div style={{ minHeight: "calc(100vh - 115px)", padding: 20 }}>
          <Routes>
            {routes.map((route, index) => {
              const validated = checkAccess(Auth, route);
              if (!validated) {
                return <Route key={index} path="*" element={<UnAuthPage />} />;
              }

              return (
                <Route
                  key={`route ${index} ${route.path}`}
                  path={route.path}
                  element={<route.component />}
                />
              );
            })}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </AppLayout>
    </ConfigProvider>
  );
}

export default App;
