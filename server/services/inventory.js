const { faker } = require("@faker-js/faker");

const prisma = require("../utils/prisma");

const dummymedicines = [
  "Acetaminophen",
  "Adderall",
  "Amitriptyline",
  "Amlodipine",
  "Amoxicillin",
  "Ativan",
  "Atorvastatin",
  "Azithromycin",
  "Benzonatate",
  "Brilinta",
  "Bunavail",
  "Buprenorphine",
  "Cephalexin",
  "Ciprofloxacin",
  "Citalopram",
  "Clindamycin",
  "Clonazepam",
  "Cyclobenzaprine",
  "Cymbalta",
  "Doxycycline",
  "Dupixent",
  "Entresto",
  "Entyvio",
  "Farxiga",
  "Fentanyl",
  "Fentanyl Patch",
  "Gabapentin",
  "Gilenya",
  "Humira",
  "Hydrochlorothiazide",
  "Hydroxychloroquine",
  "Ibuprofen",
  "Imbruvica",
  "Invokana",
  "Januvia",
  "Jardiance",
  "Kevzara",
  "Lexapro",
  "Lisinopril",
  "Lofexidine",
  "Loratadine",
  "Lyrica",
  "Melatonin",
  "Meloxicam",
  "Metformin",
  "Methadone",
  "Methotrexate",
  "Metoprolol",
  "Naloxone",
  "Naltrexone",
  "Naproxen",
  "Omeprazole",
  "Onpattro",
  "Otezla",
  "Ozempic",
  "Pantoprazole",
  "Prednisone",
  "Probuphine",
  "Rybelsus",
  "secukinumab",
  "Sublocade",
  "Tramadol",
  "Trazodone",
  "Viagra",
  "Wellbutrin",
  "Xanax",
  "Zubsolv",
];

const addMedicineService = async (name, quantity, price, description) => {
  const data = { name, quantity, price, description };
  console.log(data);
  const addMedicine = await prisma.inventory.create({ data });
  console.log({ addMedicine });
  return addMedicine;
};

const removeMedicine = async (medicineId) => {
  console.log({ medicineId });
  const removedMedicine = await prisma.inventory.delete({
    where: { id: medicineId },
  });
  console.log({ removedMedicine });
  return removedMedicine;
};

const editMedicine = async (medicineId, name, quantity, price, description) => {
  const data = { name, quantity, price, description };
  console.log(data);
  const updatedMedicine = await prisma.inventory.update({
    where: { id: medicineId },
    data,
  });
  console.log({ updatedMedicine });
  return updatedMedicine;
};

const getMedicine = async (medicineId) => {
  console.log({ medicineId });
  const gotMedicine = await prisma.inventory.findUnique({
    where: { id: medicineId },
  });
  console.log({ gotMedicine });
  return gotMedicine;
};

const addDummy = async () => {
  const data = {
    name: dummymedicines[Math.floor(Math.random() * dummymedicines.length)],
    quantity: faker.datatype.number({ min: 10, max: 100 }),
    price: faker.datatype.number({ min: 10, max: 100 }),
    description: faker.lorem.sentence(),
  };
  await prisma.inventory.create({ data });
};

const searchInventoryService = async ({ quantity, price, name }) => {
  console.log(name, quantity, price);
  const inventory = await prisma.inventory.findMany({
    where: {
      quantity: { gte: quantity },
      price: { lte: price },
      name: { contains: name },
    },
  });

  return inventory;
};

module.exports = {
  addMedicineService,
  removeMedicine,
  editMedicine,
  getMedicine,
  addDummy,
  searchInventoryService,
};
