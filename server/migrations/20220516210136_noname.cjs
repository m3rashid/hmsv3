const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * addColumn(updatedAt) => "Patients"
 * addColumn(createdAt) => "Patients"
 * changeColumn(jamiaId) => "Patients"
 * changeColumn(email) => "Patients"
 * changeColumn(address) => "Patients"
 * changeColumn(lastVisit) => "Patients"
 *
 */

const info = {
  revision: 6,
  name: "noname",
  created: "2022-05-16T21:01:36.087Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "Patients",
      "updatedAt",
      { type: Sequelize.DATE, field: "updatedAt", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "Patients",
      "createdAt",
      { type: Sequelize.DATE, field: "createdAt", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "Patients",
      "jamiaId",
      { type: Sequelize.STRING, field: "jamiaId", allowNull: true },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "Patients",
      "email",
      { type: Sequelize.STRING, field: "email", allowNull: true },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "Patients",
      "address",
      { type: Sequelize.STRING, field: "address", allowNull: true },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "Patients",
      "lastVisit",
      { type: Sequelize.DATE, field: "lastVisit", allowNull: true },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["Patients", "updatedAt", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["Patients", "createdAt", { transaction }],
  },
  {
    fn: "changeColumn",
    params: [
      "Patients",
      "jamiaId",
      { type: Sequelize.STRING, field: "jamiaId", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "Patients",
      "email",
      { type: Sequelize.STRING, field: "email", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "Patients",
      "address",
      { type: Sequelize.STRING, field: "address", allowNull: false },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "Patients",
      "lastVisit",
      { type: Sequelize.DATE, field: "lastVisit", allowNull: false },
      { transaction },
    ],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
