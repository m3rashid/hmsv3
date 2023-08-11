const singleExcludeInclude = (obj: any, keysArray: string[], exclude: boolean) => {
	const keys = Object.keys(obj);
	let filteredKeys;
	if (exclude) {
		filteredKeys = keys.filter((key) => !keysArray.includes(key));
	} else {
		filteredKeys = keys.filter((key) => keysArray.includes(key));
	}

	const filteredObj: any = {};
	for (const key of filteredKeys) {
		filteredObj[key] = obj[key];
	}
	return filteredObj;
};

export const exclude = (data: any, keysToExclude: string[]) => {
	if (!Array.isArray(keysToExclude)) {
		throw new Error('keysToExclude must be an array');
	}

	if (Array.isArray(data)) {
		return data.map((obj) => singleExcludeInclude(obj, keysToExclude, true));
	}
	return singleExcludeInclude(data, keysToExclude, true);
};

export const include = (data: any, keysToInclude: string[]) => {
	if (!Array.isArray(keysToInclude)) {
		throw new Error('keysToInclude must be an array');
	}

	if (Array.isArray(data)) {
		return data.map((obj) => singleExcludeInclude(obj, keysToInclude, false));
	}
	return singleExcludeInclude(data, keysToInclude, false);
};
