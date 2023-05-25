const bloodGroupTypes = {
  "A+": "A_POSITIVE",
  "A-": "A_NEGATIVE",
  "B+": "B_POSITIVE",
  "B-": "B_NEGATIVE",
  "O+": "O_POSITIVE",
  "O-": "O_NEGATIVE",
  "AB+": "AB_POSITIVE",
  "AB-": "AB_NEGATIVE",
  u: "UNKNOWN",
};

const genderTypes = {
  Male: "m",
  Female: "f",
  Other: "o",
};

const maritalStatus = {
  single: "SINGLE",
  "Un-Married": "SINGLE",
  Married: "MARRIED",
  Divorced: "DIVORCED",
  Widowed: "WIDOWED",
};

const patientTypes = {
  employee: "EMPLOYEE",
  student: "STUDENT",
  pensioner: "PENSIONER",
  familyPensioner: "FAMILY_PENSIONER",
  dependent: "DEPENDENT",
};

module.exports = {
  bloodGroupTypes,
  genderTypes,
  maritalStatus,
  patientTypes,
};
