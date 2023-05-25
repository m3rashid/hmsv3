const fs = require("fs");
const path = require("path");
const { serverActions } = require("../../utils/constants");
const { addEventLog } = require("../../utils/logs");
const { defaultConfig } = require("./data");

const configFilePath = path.join(__dirname, "config.json");

const getConfig = () => {
  try {
    const configFile = fs.readFileSync(configFilePath);
    const p = JSON.parse(configFile);
    return p;
  } catch (err) {
    return defaultConfig;
  }
};

const resetConfig = async ({ doneBy }) => {
  try {
    fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));
    await addEventLog({
      action: serverActions.UPDATE_CONFIG,
      fromId: doneBy.id,
      actionId: doneBy.id,
      actionTable: "",
      message: `${doneBy.name} <(${doneBy.email})> reset the app config to defaults`,
    });
    return { status: true, config: getConfig() };
  } catch (err) {
    return { status: false, config: getConfig() };
  }
};

const setConfig = async ({ config, change, doneBy }) => {
  try {
    const newConfig = JSON.parse(JSON.stringify(config));
    fs.writeFileSync(configFilePath, JSON.stringify(newConfig, null, 2));
    await addEventLog({
      action: serverActions.UPDATE_CONFIG,
      fromId: doneBy.id,
      actionId: doneBy.id,
      actionTable: "",
      message: `${doneBy.name} <(${doneBy.email})> updated app config ${
        change.name
      } from ${change.oldValue} to ${change.newValue} ${
        change.namespace.length
          ? "inside " + change.namespace.join(" ") + " namespaces"
          : ""
      }`,
    });
    return { status: true, config: getConfig() };
  } catch (err) {
    return { status: false, config: getConfig() };
  }
};

module.exports = {
  getConfig,
  setConfig,
  resetConfig,
};
