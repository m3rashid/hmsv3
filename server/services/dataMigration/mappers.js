const genericTypes = {
  bloodGroup: "bloodGroup",
  gender: "sex",
  maritalStatus: "maritalStatus",
  dependentStatus: "dependentStatus",
};

const employeesMapper = {
  "S.NO": "slNo",
  "EMP ID": "userId",
  "EMP NAME": "name",
  "EMP FATHER'S NAME": "fathersName", // json
  DESIGNATION: "designation",
  "MARITAL STATUS": genericTypes.maritalStatus,
  GENDER: genericTypes.gender, // handleGender
  "BLOOD GROUP": genericTypes.bloodGroup, // handleBloodGroup
  "D.O.B": "dob",
  "FDR NO": "fdr",
  "D.O.R": "dor",
  DEPARTMENT: "department",
  ADDESS: "address",
  "CONTACT NUMBER": "contact",
};

const pensionerMapper = {
  "S.NO": "slNo",
  "EMP ID": "userId",
  "EMP NAME": "name",
  "PENSIONER NAME": "otherUser", // figure out this
  "PENSIONER RELATION": "relationWithOtherUser",
  "EMP FATHER'S NAME": "fathersName",
  DESIGNATION: "designation",
  "MARITAL STATUS": "maritalStatus",
  GENDER: genericTypes.gender, // handleGender
  "BLOOD GROUP": genericTypes.bloodGroup, // handleBloodGroup
  "D.O.B": "dob",
  "FDR NO": "fdr",
  "D.O.R": "dor",
  DEPARTMENT: "department",
  ADDESS: "address",
  "CONTACT NUMBER": "contact",
};

const familyPensionerMapper = {
  "S.NO": "slNo",
  "EMP ID": "userId",
  "EMP NAME": "name",
  "FAMILY PENSIONER NAME": "otherUser",
  "PENSIONER RELATION": "relationWithOtherUser",
  "EMP FATHER'S NAME": "fathersName",
  DESIGNATION: "designation",
  "FAMILY PENSIONER MARITAL STATUS": genericTypes.maritalStatus,
  "FAMILY PENSIONER GENDER": genericTypes.gender, // handleGender
  "EMPLOYEE BLOOD GROUP": genericTypes.bloodGroup, // handleBloodGroup
  "FAMILY PENSIONER D.O.B": "dob",
  "FDR NO": "fdr",
  "EMPLOYEE D.O.R": "dor",
  DEPARTMENT: "department",
  ADDESS: "address",
  "CONTACT NUMBER": "contact",
};

/*
S.No	
EMP ID	
EMP NAME	
EMPLOYEE DESIGNATION	
FAMILY MEMBER NAME	
RELATIONSHIP	
FAMILY MEMBER MARITAL STATUS	
FAMILY MEMBER GENDER	
FAMILY MEMBER DOB	
DEPENDENT STATUS	
FDR	
EMP D.O.R	
ADDESS	
CONTACT NUMBER
*/

const dependentMapper = {
  "S.No": "slNo",
  "EMP ID": "userId",
  "EMP NAME": "otherUser",
  "EMPLOYEE DESIGNATION": "designation",
  "FAMILY MEMBER NAME": "name",
  RELATIONSHIP: "relationWithOtherUser",
  "FAMILY MEMBER MARITAL STATUS": genericTypes.maritalStatus,
  "FAMILY MEMBER GENDER": genericTypes.gender, // handleGender
  "FAMILY MEMBER DOB": "dob",
  "DEPENDENT STATUS": genericTypes.dependentStatus,
  FDR: "fdr",
  "EMP D.O.R": "dor",
  ADDESS: "address",
  "CONTACT NUMBER": "contact",
};

// TODO: complete this (waiting for data from CIT)
const studentMapper = {};

const correctMapper = {
  EMPLOYEE: employeesMapper,
  PENSIONER: pensionerMapper,
  FAMILY_PENSIONER: familyPensionerMapper,
  DEPENDENT: dependentMapper,
  STUDENT: studentMapper,
};

module.exports = {
  correctMapper,
  genericTypes,
};
