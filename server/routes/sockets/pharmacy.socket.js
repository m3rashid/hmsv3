const { dispensePrescriptionService } = require("../../services");

const pharmacistLeft =
  (io, socket) =>
  ({ pharmacistId }) => {
    io.emit("pharmacist-left", { pharmacistId });
  };

const dispensePrescription =
  (io, socket) =>
  async ({ prescriptionId, medicines }) => {
    const data = await dispensePrescriptionService({
      prescriptionId,
      medicines,
      createdBy: socket.user.id,
    });
    io.emit("prescription-dispensed", { data });
  };

module.exports = {
  pharmacistLeft,
  dispensePrescription,
};
