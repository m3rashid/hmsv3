const singleExcludeInclude = (obj, keysArray, exclude) => {
  const keys = Object.keys(obj);
  let filteredKeys;
  if (exclude) {
    filteredKeys = keys.filter((key) => !keysArray.includes(key));
  } else {
    filteredKeys = keys.filter((key) => keysArray.includes(key));
  }

  const filteredObj = {};
  for (const key of filteredKeys) {
    filteredObj[key] = obj[key];
  }
  return filteredObj;
};

const exclude = (data, keysToExclude) => {
  if (!Array.isArray(keysToExclude)) {
    throw new Error("keysToExclude must be an array");
  }

  if (Array.isArray(data)) {
    return data.map((obj) => singleExcludeInclude(obj, keysToExclude, true));
  }
  return singleExclude(data, keysToExclude, true);
};

const include = (data, keysToInclude) => {
  if (!Array.isArray(keysToInclude)) {
    throw new Error("keysToInclude must be an array");
  }

  if (Array.isArray(data)) {
    return data.map((obj) => singleExcludeInclude(obj, keysToInclude, false));
  }
  return singleExcludeInclude(data, keysToInclude, false);
};

module.exports = {
  exclude,
  include,
};
