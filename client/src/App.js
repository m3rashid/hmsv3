import React from "react";
import "./styles/theme.less";
import AppLayout from "./components/Layout/AppLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes, { validateRoute } from "./routes";
import { useRecoilState } from "recoil";
import { authState } from "./atoms/auth";
import { useQuery } from "react-query";
import { revalidateJWT } from "./api/auth/revalidateJWT";
import Loading from "./components/Loading/Loading";
import Home from "./pages/home";
import UnAuthPage from "./pages/unAuthenticated";

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
          <div style={{ height: "100vh" }}>
            <Routes>
              {routes.map((route, index) => {
                const validated = validateRoute(Auth, route);
                if (!validated) {
                  return <Route path="*" element={<UnAuthPage />} />;
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
            </Routes>
          </div>
        </div>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
