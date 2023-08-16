import { permissions } from "gatekeeper";
import { checkAccess } from "../utils/auth.helpers";
import { PatientModel } from "../models/patient";

export const createPatientService = async (data: any, UserPermissions: string[], doneBy: any) => {
  if (!checkAccess([permissions.RECEPTION_CREATE_PATIENT], UserPermissions)) {
    throw new Error('Forbidden');
  }

  const newPatient = new PatientModel({ data });
	await newPatient.save()

  await addEventLog({
    action: serverActions.CREATE_PATIENT,
    fromId: doneBy.id,
    actionId: newPatient.id,
    actionTable: 'patient',
    message: `${doneBy?.name} <(${doneBy?.email})> created patient  ${data?.name}`,
  });

  return { patient: newPatient };
};

export const deletePatientService = async ({ patientId, doneBy }:any) => {
	const pastPatient = await PatientModel.findById(
		patientId
	);

	const patient = await prisma.patient.delete({
		where: { id: patientId },
	});

	if (!patient) throw new Error('Patient not found');

	await addEventLog({
		action: serverActions.DELETE_PATIENT,
		fromId: doneBy.id,
		actionId: patientId,
		actionTable: 'patient',
		message: `${doneBy.name} <(${doneBy.email})> deleted patient  ${pastPatient.name}  <(${pastPatient.email})>`,
	});

	return patient;
};

export const getPatientByIdService = async (patientId: string) => {
  const patient = await prisma.patient.findUnique({
    where: {
      id: parseInt(patientId),
    },
    include: {
      Appointment: {
        include: {
          doctor: true,
          Prescription: {
            include: {
              medicines: {
                include: {
                  Medicine: true,
                },
              },
              Test: true,
            },
          },
        },
      },
    },
  });
  if (!patient) throw new Error('Patient not found');

  return { patient };
};

export const searchPatientsService = async ({ query }: any) => {
  const patients = await prisma.Patient.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { userId: { contains: query, mode: 'insensitive' } },
        { contact: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });

  return { count: patients.length, patients };
};
