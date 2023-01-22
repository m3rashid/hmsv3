const fs = require("fs");
const path = require("path");
const util = require("util");
const { serverActions } = require("../../utils/constants");
const { addEventLog } = require("../../utils/logs");
const writeToFile = util.promisify(fs.writeFileSync);
const { defaultConfig } = require("./data");

const getConfig = () => {
  const configFile = fs.readFileSync(path.join(__dirname, "config.json"));
  try {
    const p = JSON.parse(configFile);
    return { ...defaultConfig, ...p };
  } catch (err) {
    return defaultConfig;
  }
};

const setConfig = async ({ config, doneBy }) => {
  try {
    const newConfig = JSON.parse(JSON.stringify(config));
    console.log({ newConfig });

    await writeToFile(configFilePath, JSON.stringify(newConfig, null, 2));
    await addEventLog({
      action: serverActions.UPDATE_CONFIG,
      fromId: doneBy.id,
      actionId: doneBy.id,
      actionTable: "",
      message: `${doneBy.name} <(${
        doneBy.email
      })> updated config to ${JSON.stringify(newConfig)}`,
    });
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  getConfig,
  setConfig,
};
