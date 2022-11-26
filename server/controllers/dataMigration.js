const XLSX = require("xlsx");
const fs = require("fs");

const handleDataMigration = async (req, res) => {
  const { path: filePath } = req.file;
  const wb = XLSX.readFile(filePath);

  // ============================= //
  //    DO ALL PROCESSING HERE     //
  // ============================= //

  const supportedSheets = [
    "Employee",
    "Pensioner",
    "Family Pensioner",
    "Dependent",
  ];

  const sheets = wb.SheetNames.filter((sheet) =>
    supportedSheets.includes(sheet)
  );

  if (sheets.length !== supportedSheets.length) {
    throw new Error("Sheets did not match the expected sheetnames");
  }

  const [employeeSheet, pensionerSheet, familyPensionerSheet, dependentSheet] =
    supportedSheets.map((s) => XLSX.utils.sheet_to_json(wb.Sheets[s]));

  await handleDataMigration("EMPLOYEE", employeeSheet, "EMP ID");
  await handleDataMigration("PENSIONER", pensionerSheet, "EMP ID");
  await handleDataMigration("FAMILY_PENSIONER", familyPensionerSheet, "EMP ID");
  await handleDataMigration("DEPENDENT", dependentSheet, "EMP ID");

  console.log("Data Got:", {
    employees: employeeSheet.length,
    pensioners: pensionerSheet.length,
    familyPensioners: familyPensionerSheet.length,
    dependents: dependentSheet.length,
  });

  // remove the file from the server
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    throw new Error("Data migration successful");
  }

  return res.status(200).json({
    message: "Data migration successful",
  });
};

module.exports = {
  handleDataMigration,
};
