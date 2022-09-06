const {
  createPatientService,
  deletePatientService,
} = require("../../services");

const createPatient =
  (io, socket) =>
  async ({ name, age, sex, contact, address, email, jamiaId }) => {
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
      socket.user.permissions,
      socket.user
    );
    io.emit("new-patient-created", { data: patient });
  };

const deletePatient =
  (io, socket) =>
  async ({ patientId }) => {
    await deletePatientService({
      patientId,
      doneBy: socket.user,
    });
    io.emit("patient-delete-success", { patientId });
  };

module.exports = {
  createPatient,
  deletePatient,
};
