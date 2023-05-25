const { bloodGroupTypes, genderTypes, maritalStatus } = require("./types");

const handleGender = (g) => {
  return genderTypes[g] ?? genderTypes.Other;
};

const handleBloodGroup = (b) => {
  return bloodGroupTypes[b] ?? bloodGroupTypes.u;
};

const handleMaritalStatus = (m) => {
  return maritalStatus[m] ?? maritalStatus.single;
};

const handleDependentStatus = (d) => {
  return d === "Y" ? true : false;
};

module.exports = {
  handleGender,
  handleBloodGroup,
  handleMaritalStatus,
  handleDependentStatus,
};
