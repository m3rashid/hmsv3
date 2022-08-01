const { UserDetails } = require("./auth.js");
const prisma = require("../utils/prisma");

const getDoctorAppointmentsService = async (userId) => {
  const Doc = await UserDetails(userId, "DOCTOR");
  const appointments = await prisma.Appointment.findMany({
    where: { doctorId: Doc.id },
    include: { doctor: true, patient: true },
    orderBy: { date: "desc" },
  });

  console.log(appointments);
  return { appointments };
};

// FIX this bad query
const getDoctorPatientsService = async (doctorId) => {
  const patients = await prisma.Patient.findMany({
    where: {},
  });
  return { patients };
};

const createDoctorService = async (doctor) => {
  try {
    const newDoctor = await prisma.Doctor.create(doctor);
    return { newDoctor };
  } catch (err) {
    console.log(err);
    return new Error("Internal Server Error");
  }
};

const searchDoctorsService = async ({
  name,
  minAge,
  maxAge,
  designation,
  contact,
  email,
  address,
}) => {
  // FIX this bad query
  const whereClause = {
    ...(name && { name: { [Op.like]: `%${name}%` } }),
    ...(minAge && { age: { [Op.gte]: minAge } }),
    ...(maxAge && { age: { [Op.lte]: maxAge } }),
    ...(minAge && { [Op.gte]: minAge }),
    ...(designation && { [Op.like]: designation }),
    ...(contact && { [Op.like]: `%${contact}%` }),
    ...(address && { [Op.like]: `%${address}%` }),
    ...(email && { [Op.like]: `%${email}%` }),
  };

  console.log(whereClause);

  const doctors = await prisma.Doctor.findAll({
    where: {
      [Op.or]: whereClause,
    },
    raw: true,
  });

  console.log(doctors);
  return { count: doctors.length, doctors };
};

const createPrescriptionByDoctorService = async (
  appointment,
  symptoms,
  prescription,
  CustomMedicines,
  datetime
) => {
  // Fix this bad query
  const newPrescription = await prisma.Prescription.create({
    data: {
      appointmentId: appointment,
      symptoms,
      prescription,
      CustomMedicines,
      datePrescribed: datetime,
    },
    include: {
      appointment: true,
      doctor: true,
      patient: true,
    },
  });

  const newPresDetails = await newPrescription.getAppointment();
  const patient = await newPresDetails.getPatient();
  const doctor = await newPresDetails.getDoctor();

  return {
    prescription: newPrescription,
    doctor,
    patient,
  };
};

module.exports = {
  getDoctorAppointmentsService,
  getDoctorPatientsService,
  createDoctorService,
  searchDoctorsService,
  createPrescriptionByDoctorService,
};
