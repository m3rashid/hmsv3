import db from "../models/index.js";

export const getDoctorAppointments = async (req, res) => {
  try {
    if (!req.user || !req.user.id || req.user.role !== "DOCTOR")
      throw new Error("Unauthorized");

    const appointments = await db.Doctor.findAll({
      where: { id: req.user.id },
      include: [{ model: db.Appointment, as: "Appointments" }],
    });
    console.log(appointments);
    return res.status(200).json({ appointments });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

export const getDoctorPatients = async (req, res) => {
  try {
    if (!req.user || !req.user.id || req.user.role !== "DOCTOR")
      throw new Error("Unauthorized");

    const patients = await db.Patients.findAll({
      where: {},
    });
    return res.status(200).json({ patients });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
