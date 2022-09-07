import React from "react";
import { Divider } from "antd";
import { useLocation } from "react-router-dom";

import Header from "../../components/Header";
import { toSentenceCase } from "../../utils/strings";

const AdminWrapper = ({ children }) => {
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
        <div style={{ marginTop: "10px", marginLeft: "0px" }}>
          <h2>{heading}</h2>
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminWrapper;
