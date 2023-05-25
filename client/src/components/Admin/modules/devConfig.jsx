import React, { Fragment } from "react";
import { useRecoilState } from "recoil";
import ReactJson from "react-json-view";
import { Button, message, Typography } from "antd";

import { configState } from "atoms/config";
import { instance } from "api/instance";

const isProduction = process.env.NODE_ENV === "production";

const DevConfig = () => {
  const [config, setConfig] = useRecoilState(configState);
  const configRootKeys = Object.keys(config);
  const sidebarKeymaps = Object.keys(config.sidebar_keymaps);
  const nonEditableFieldsInDevelopers = [
    "name",
    "department",
    "github",
    "linkedin",
  ];

  const updateDevConfig = async (e) => {
    const res = await instance.post("/admin/config", {
      config: e.updated_src,
      change: {
        name: e.name,
        oldValue: e.existing_value,
        newValue: e.new_value ?? "",
        namespace: e.namespace ?? [],
      },
    });
    return res.data;
  };

  const resetConfig = async () => {
    try {
      await instance.post("/admin/config/reset", {});
    } catch (err) {
      console.log(err);
      message.error("Error in resetting config");
    }
  };

  const onAdd = (e) => {};

  const onEdit = async (e) => {
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

    try {
      const { config, message: txt } = await updateDevConfig(e);
      message.success(txt);
      setConfig(config);
    } catch (err) {
      console.log(err);
      message.error("Error in updating config");
    }
  };

  const onDelete = async (e) => {
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

    try {
      const { config, message: txt } = await updateDevConfig(e);
      message.success(txt);
      setConfig(config);
    } catch (err) {
      message.error("Error in updating config");
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography.Title level={4}>Dev Config</Typography.Title>
        <Button onClick={resetConfig}>Reset Config to Defaults</Button>
      </div>
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
