const {
  createPatientService,
  deletePatientService,
} = require("../../services");

const createPatient = async ({
  name,
  age,
  sex,
  contact,
  address,
  email,
  jamiaId,
}) => {
  try {
    console.log(socket.user);
    const { patient } = await createPatientService(
      {
        name,
        age,
        sex,
        contact,
        email,
        address,
        jamiaId,
      },
      socket?.user?.permissions
    );
    console.log(patient, "New patient created");
    io.emit("new-patient-created", { data: patient });
  } catch (err) {
    console.log(err);
    io.emit("error", {
      message: err.message || "An error occured",
    });
  }
};

const deletePatient = async ({ patientId }) => {
  try {
    await deletePatientService(patientId);
    io.emit("patient-delete-success", { patientId });
  } catch (err) {
    console.log(err);
    io.emit("error", {
      message: err.message || "An error occured",
    });
  }
};

module.exports = {
  createPatient,
  deletePatient,
};
