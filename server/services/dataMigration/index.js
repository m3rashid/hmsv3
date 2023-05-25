const {
  handleBloodGroup,
  handleGender,
  handleMaritalStatus,
  handleDependentStatus,
} = require("./helpers");
const { patientTypes } = require("./types");
const { prisma } = require("../../utils/prisma");
const { correctMapper, genericTypes } = require("./mappers");

const handleMigrationService = async (type, dataSheet, uniqueLabel) => {
  const uniqueFieldInDb = "userId";
  const mapper = correctMapper[type];

  if (!Object.values(patientTypes).includes(type)) {
    throw new Error("Invalid patient type");
  }

  const empIdMap = new Map();
  if (type === patientTypes.dependent) {
    dataSheet.forEach((item) => {
      if (empIdMap.has(item[uniqueLabel])) {
        const val = empIdMap.get(item[uniqueLabel]);
        empIdMap.set(item[uniqueLabel], val + 1);
      } else {
        empIdMap.set(item[uniqueLabel], 1);
      }

      item[uniqueLabel] = item[uniqueLabel].concat(
        "/" + empIdMap.get(item[uniqueLabel])
      );
    });
  }

  // convert data to map with empId as key
  const excelSheetData = dataSheet.reduce((acc, curr) => {
    return {
      ...acc,
      [curr[uniqueLabel]]: curr,
    };
  }, {});

  const dataDb = await prisma.patient.findMany({
    where: { type: type },
  });

  for (items in dataDb) {
    if (excelSheetData[items[uniqueFieldInDb]]) {
      excelSheetData[items[uniqueFieldInDb]] = null;
    }
  }

  // remove the null values from sheetData
  const filteredData = Object.entries(excelSheetData).reduce(
    (acc, [key, value]) => {
      return value ? { ...acc, [key]: value } : acc;
    },
    {}
  );

  const promises = [];

  // convert the data to the format required by the database
  Object.values(filteredData).forEach((dataItem) => {
    const convertedData = Object.entries(dataItem).reduce(
      (acc, [key, value]) => {
        return {
          ...acc,
          ...(mapper[key] !== "slNo" && {
            [mapper[key]]: value,
          }),
        };
      },
      {}
    );

    if (convertedData[genericTypes.gender]) {
      convertedData[genericTypes.gender] = handleGender(
        convertedData[genericTypes.gender]
      );
    }

    if (convertedData[genericTypes.bloodGroup]) {
      convertedData[genericTypes.bloodGroup] = handleBloodGroup(
        convertedData[genericTypes.bloodGroup]
      );
    }

    if (convertedData[genericTypes.maritalStatus]) {
      convertedData[genericTypes.maritalStatus] = handleMaritalStatus(
        convertedData[genericTypes.maritalStatus]
      );
    }

    if (convertedData[genericTypes.dependentStatus]) {
      convertedData[genericTypes.dependentStatus] = handleDependentStatus(
        convertedData[genericTypes.dependentStatus]
      );
    }

    const query = prisma.patient.create({
      data: {
        ...convertedData,
        type: type,
      },
    });

    promises.push(query);
  });

  await Promise.all(promises);
};

module.exports = {
  handleMigrationService,
};
