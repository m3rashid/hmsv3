import Sequelize from "sequelize";
import fs from "fs";
import path from "path";

// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "./db.sqlite",
// });
console.log("sequelize", process.env.MYSQL_PASSWORD);
const sequelize = new Sequelize({
  host: "localhost",
  dialect: "mysql",
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const db = {};

const fileSystem = async (files) => {
  // console.log(files);

  for (let i = 0; i < files.length; i++) {
    if (files[i] !== "index.js") {
      const file = files[i];
      console.log(file);
      const { default: m } = await import(`./${file}`);
      // console.log(m.default(sequelize));
      const model = m(sequelize);
      console.log("assosicate", model.associate);
      db[model.name] = model;
    }
  }
  // await files.forEach(async (file) => {
  //   if (file !== "index.js") {
  //     // console.log(file);
  //     console.log(file);
  //     const model = await import(`./${file}`);

  //     const m = await model.default(sequelize);
  //     console.log("import : ", m.name);
  //     db[m.name] = m;
  //   }
  // });
};

// s

const files = fs.readdirSync(`${path.resolve()}/models/`);
// console.log(files);
fileSystem(files).then(() => {
  // console.log(Object.keys(db));
  Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
});

// for (let model in models) {
//   console.log(model);
// }
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
