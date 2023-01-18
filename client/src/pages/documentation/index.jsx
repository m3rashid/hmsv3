import { GlobalOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import React, { Fragment, useState } from "react";
import { Steps, Typography } from "antd";
import { MindMapGraph } from "@ant-design/graphs";

const Learn = () => {
  const steps = [
    {
      title: "Product Flow",
      subTitle: "Diagram",
      description: "Data Flow mind map of the entire Idea",
      icon: <GlobalOutlined />,
    },
    {
      title: "Users Involved",
      description: "Brief Overview of the users involved",
      subTitle: "Overview",
      icon: <UsergroupAddOutlined />,
    },
  ];

  const [current, setCurrent] = useState(0);

  return (
    <Fragment>
      <MindMapGraph />

      <Typography.Title level={3}>Documentation</Typography.Title>
      <Steps
        current={current}
        direction="vertical"
        items={steps}
        onChange={setCurrent}
      />
    </Fragment>
  );
};

export default Learn;
