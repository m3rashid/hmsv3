import React, { useEffect } from "react";
import "./styles/theme.less";
import AppLayout from "./components/Layout/AppLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes, { validateRoute } from "./routes";
import { useRecoilState } from "recoil";
import { authState } from "./atoms/auth";
import { useQuery } from "react-query";
import { revalidateJWT } from "./api/auth/revalidateJWT";
import Loading from "./components/Loading/Loading";
import { message } from "antd";

function App() {
  const [Auth, setAuth] = useRecoilState(authState);

  const { isLoading } = useQuery(["revalidate", setAuth], () =>
    revalidateJWT(setAuth)
  );

  if (isLoading) {
    return <Loading text="App is Loading.." />;
  }

  return (
    <BrowserRouter>
      <AppLayout>
        <div className="App">
          <div
            style={{
              height: "100vh",
            }}
          >
            <Routes>
              {routes.map((route, index) => {
                if (!validateRoute(Auth, route)) return null;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={<route.component />}
                  />
                );
              })}
            </Routes>
          </div>
        </div>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
