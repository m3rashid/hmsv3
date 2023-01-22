import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import ReactJson from "react-json-view";
import { message, Typography } from "antd";

import { configState } from "atoms/config";

const isProduction = process.env.NODE_ENV === "production";

const DevConfig = () => {
  const config = useRecoilValue(configState);
  const configRootKeys = Object.keys(config);
  const sidebarKeymaps = Object.keys(config.sidebar_keymaps);
  // const homepageContents = Object.keys(config.homepage_contents)
  const nonEditableFieldsInDevelopers = [
    "name",
    "department",
    "github",
    "linkedin",
  ];

  const onAdd = (e) => {};

  const onEdit = (e) => {
    if (configRootKeys.includes(e.name) && !e.new_value) {
      message.error(`${e.name} cannot be empty`);
      return false;
    }
    if (e.namespace.includes("developers")) {
      if (nonEditableFieldsInDevelopers.includes(e.name)) {
        message.error(`Cannot edit the ${e.name} field`);
        return false;
      }
    }
    console.log({ e });
  };

  const onDelete = (e) => {
    if (configRootKeys.includes(e.name) || sidebarKeymaps.includes(e.name)) {
      message.error(`Cannot remove the (${e.name}) root key`);
      return false;
    }
    if (e.namespace.includes("homepage_contents")) {
      if (e.updated_src.homepage_contents.carousel.length === 0) {
        message.error(`Cannot remove all the carousel items`);
        return false;
      }

      if (e.updated_src.homepage_contents.people.length === 0) {
        message.error(`Cannot remove all the people items`);
        return false;
      }
    }
    if (e.namespace.includes("developers")) {
      message.error(`Cannot remove the developers namespace`);
      return false;
    }
    console.log({ e });
  };

  return (
    <Fragment>
      <Typography.Title level={4}>Dev Config</Typography.Title>
      <ReactJson
        validationMessage="Error in updating config"
        name="Root Config"
        indentWidth={2}
        onAdd={onAdd}
        src={config}
        collapsed={false}
        onEdit={onEdit}
        onDelete={onDelete}
        displayDataTypes={!isProduction}
        displayObjectSize={!isProduction}
      />
    </Fragment>
  );
};

export default DevConfig;
