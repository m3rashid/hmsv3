import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";

// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "./db.sqlite",
// });
const sequelize = new Sequelize({
  host: "localhost",
  dialect: "mysql",
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = {};

const fileSystem = async (files) => {
  // console.log(files);
  for (let i = 0; i < files.length; i++) {
    if (files[i] !== "index.js") {
      const file = files[i];
      console.log(file);
      const { default: m } = await import(`./${file}`);
      const model = m(sequelize);
      console.log("assosicate", model.associate);
      db[model.name] = model;
    }
  }
};

const files = fs.readdirSync(`${path.resolve()}/models/`);

fileSystem(files).then(() => {
  Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
