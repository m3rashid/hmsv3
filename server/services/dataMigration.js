const { prisma } = require("../utils/prisma");

const patientTypes = [
  "EMPLOYEE",
  "STUDENT",
  "PENSIONER",
  "FAMILY_PENSIONER",
  "DEPENDENT",
];

// mappers provide a way to map data from the excel sheet to the database

// TODO: complete this
const employeesMapper = {
  "S.NO": "slNo",
  "EMP ID": "empId",
  "EMP NAME": "",
  "EMP FATHER'S NAME": "",
  DESIGNATION: "",
  "MARITAL STATUS": "",
  GENDER: "",
  "BLOOD GROUP": "",
  "D.O.B": "",
  "FDR NO": "",
  "D.O.R": "",
  DEPARTMENT: "",
  ADDESS: "",
  "CONTACT NUMBER": "",
};

// TODO: complete this
const pensionerMapper = {
  "S.NO": "slNo",
  "EMP ID": "empId",
  "EMP NAME": "",
  "PENSIONER NAME": "",
  "PENSIONER RELATION": "",
  "EMP FATHER'S NAME": "",
  DESIGNATION: "",
  "MARITAL STATUS": "",
  GENDER: "",
  "BLOOD GROUP": "",
  "D.O.B": "",
  "FDR NO": "",
  "D.O.R": "",
  DEPARTMENT: "",
  ADDESS: "",
  "CONTACT NUMBER": "",
};

// TODO: complete this
const familyPensionerMapper = {
  "S.NO": "",
  "EMP ID": "",
  "EMP NAME": "",
  "FAMILY PENSIONER NAME": "",
  "PENSIONER RELATION": "",
  "EMP FATHER'S NAME": "",
  DESIGNATION: "",
  "FAMILY PENSIONER MARITAL STATUS": "",
  "FAMILY PENSIONER GENDER": "",
  "EMPLOYEE BLOOD GROUP": "",
  "FAMILY PENSIONER D.O.B": "",
  "FDR NO": "",
  "EMPLOYEE D.O.R": "",
  DEPARTMENT: "",
  ADDESS: "",
  "CONTACT NUMBER": "",
};

// TODO: complete this
const dependentMapper = {
  "S.No": "",
  "EMP ID": "",
  "EMP NAME": "",
  "EMPLOYEE DESIGNATION": "",
  "FAMILY MEMBER NAME": "",
  RELATIONSHIP: "",
  "FAMILY MEMBER MARITAL STATUS": "",
  "FAMILY MEMBER GENDER": "",
  "FAMILY MEMBER DOB": "",
  "DEPENDENT STATUS": "",
  FDR: "",
  "EMP D.O.R": "",
  ADDESS: "",
  "CONTACT NUMBER": "",
};

// TODO: complete this (waiting for data from CIT)
const studentMapper = {};

const correctMapper = {
  EMPLOYEE: employeesMapper,
  PENSIONER: pensionerMapper,
  FAMILY_PENSIONER: familyPensionerMapper,
  DEPENDANT: dependentMapper,
  STUDENT: studentMapper,
};

/**
 * This is exceptionally unstable
 * - not tested
 * - not complete
 * - only made keeping employees in mind
 */
const handleMigrationService = async (type, dataSheet, uniqueLabel) => {
  const mapper = correctMapper[type];

  if (!patientTypes.includes(type)) {
    throw new Error("Invalid patient type");
  }

  const uniqueFieldInDb = type === "STUDENT" ? "jamiaId" : "empId";

  // convert data to map with empId as key
  const sheetData = dataSheet.reduce((acc, curr) => {
    return {
      ...acc,
      [curr[uniqueLabel]]: curr,
    };
  }, {});
  console.log(sheetData);

  // const dataDb = await prisma.patient.findMany({
  //   where: { type: type },
  // });

  // for (items in dataDb) {
  //   if (sheetData[items[uniqueFieldInDb]]) {
  //     sheetData[items[uniqueFieldInDb]] = null;
  //   }
  // }

  // remove the null values from sheetData

  // const filteredData = Object.entries(sheetData).reduce((acc, [key, value]) => {
  //   return value ? { ...acc, [key]: value } : acc;
  // }, {});

  // convert the data to the format required by the database
  // const promises = [];

  // Object.values(filteredData).forEach((dataItem) => {
  //   const convertedData = Object.entries(dataItem).reduce(
  //     (acc, [key, value]) => {
  //       return { ...acc, [mapper[key]]: value };
  //     },
  //     {}
  //   );
  //   promises.push(
  //     prisma.patient.create({
  //       data: {
  //         ...convertedData,
  //         type: type,
  //       },
  //     })
  //   );
  // });

  // await Promise.all(promises);
};

module.exports = {
  handleMigrationService,
};
