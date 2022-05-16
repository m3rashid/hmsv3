import db from "../models/index.js";
import { Op } from "sequelize";
const { Patient } = db;
export const createPatient = async (req, res) => {
  const { name, age, sex, contact, address, email, jamiaId } = req.body;
  if (!name || !age || !sex || !contact || !email) {
    throw new Error("Missing credentials");
  }
  const newPatient = await Patient.create({
    name,
    age,
    sex,
    contact,
    address,
    email,
    jamiaId,
  });
  return res.status(200).json({
    message: "Patient creation Successful",
    newPatient,
  });
};

export const deletePatient = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findOne({
    where: {
      id,
    },
  });
  if (!patient) {
    throw new Error("Patient not found");
  }
  await patient.destroy();
  return res.status(200).json({
    message: "Patient deletion Successful",
  });
};

export const getPatientById = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findOne({
    where: {
      id,
    },
  });
  if (!patient) {
    throw new Error("Patient not found");
  }
  return res.status(200).json({
    message: "Patient found",
    patient,
  });
};

export const searchPatients = async (req, res) => {
  const {
    name,
    minAge,
    maxAge,
    sex,
    contact,
    address,
    email,
    jamiaId,
    lastVisitedBefore,
    lastVisitedAfter,
  } = req.query;
  const whereClause = {};
  if (name) {
    whereClause.name = {
      [Op.like]: `%${name}%`,
    };
  }
  if (minAge) {
    whereClause.age = {
      [Op.gte]: minAge,
    };
  }
  if (maxAge) {
    whereClause.age = {
      [Op.lte]: maxAge,
    };
  }
  if (sex) {
    whereClause.sex = {
      [Op.eq]: sex,
    };
  }

  if (contact) {
    whereClause.contact = {
      [Op.like]: `%${contact}%`,
    };
  }
  if (address) {
    whereClause.address = {
      [Op.like]: `%${address}%`,
    };
  }
  if (email) {
    whereClause.email = {
      [Op.like]: `%${email}%`,
    };
  }
  if (jamiaId) {
    whereClause.jamiaId = {
      [Op.like]: `%${jamiaId}%`,
    };
  }
  if (lastVisitedBefore) {
    whereClause.lastVisit = {
      [Op.lte]: new Date(lastVisitedBefore).toISOString(),
    };
  }
  if (lastVisitedAfter) {
    whereClause.lastVisit = {
      [Op.gte]: new Date(lastVisitedAfter).toISOString(),
    };
  }

  const patients = await Patient.findAll({
    where: whereClause,
    attributes: [
      "id",
      "name",
      "age",
      "sex",
      "contact",
      "address",
      "email",
      "jamiaId",
      "lastVisit",
    ],
    order: [["createdAt", "DESC"]],
  });
  return res.status(200).json({
    message: `${patients.length} patients found`,
    patients,
  });
};
