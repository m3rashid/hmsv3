const prisma = require("./prisma");

const addEventLog = async ({ action, fromId, toId, actionId, actionTable }) => {
  const log = await prisma.log.create({
    data: {
      action,
      fromId,
      toId,
      actionId,
      actionTable,
    },
  });
  return log;
};

module.exports = {
  addEventLog,
};
