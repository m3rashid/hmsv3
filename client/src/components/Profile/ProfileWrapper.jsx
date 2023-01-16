import { Fragment, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge, Card, Divider, theme } from "antd";

import { authState } from "atoms/auth";
import ShowEntry from "components/common/showEntry";

const ProfileWrapper = ({ children }) => {
  const auth = useRecoilValue(authState);
  const { token } = theme.useToken();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/me" && auth.user.permissions.includes("ADMIN")) {
      navigate("/admin/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <Fragment>
      <div style={{ borderRadius: 10, paddingRight: 20, paddingLeft: 20 }}>
        {auth.user && (
          <div style={{ width: "50%", margin: 20, marginLeft: 0 }}>
            <Badge.Ribbon color={token.colorPrimary} text="Online">
              <Card title={auth.user[auth.user.role]?.name} size="small">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: 10,
                  }}
                >
                  <ShowEntry label="Email" value={auth.user.email} />
                </div>
              </Card>
            </Badge.Ribbon>
          </div>
        )}
      </div>
      <Divider />
      {children}
    </Fragment>
  );
};

export default ProfileWrapper;
