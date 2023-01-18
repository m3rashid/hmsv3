import { Fragment } from "react";
import { useLocation } from "react-router-dom";

import { toSentenceCase } from "utils/strings";

const AdminWrapper = ({ aside, children, hideHeading }) => {
  const { pathname } = useLocation();

  const heading = pathname
    .split("/")[2]
    .split("-")
    .map(toSentenceCase)
    .join(" ");

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {!hideHeading && <h2>{heading}</h2>}
        {aside}
      </div>
      {children}
    </Fragment>
  );
};

export default AdminWrapper;
