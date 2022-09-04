const prisma = require("./prisma");

const addEventLog = async ({ action, fromId, actionId, actionTable }) => {
  const log = await prisma.log.create({
    data: {
      action,
      fromId,
      actionId,
      actionTable,
    },
  });

  console.log({ log });

  return log;
};

module.exports = {
  addEventLog,
};
