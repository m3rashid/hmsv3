import React from "react";
import { Divider } from "antd";
import { useLocation } from "react-router-dom";

import Header from "../../components/Header";
import { toSentenceCase } from "../../utils/strings";

const AdminWrapper = ({ aside, children }) => {
  const { pathname } = useLocation();
  const [online, setOnline] = React.useState(true);

  const heading = pathname
    .split("/")[2]
    .split("-")
    .map(toSentenceCase)
    .join(" ");

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Header online={online} setOnline={setOnline} />
        <Divider />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>{heading}</h2>
          {aside}
        </div>
        <div style={{ marginTop: "10px", marginLeft: "0px" }}>{children}</div>
      </div>
    </>
  );
};

export default AdminWrapper;
