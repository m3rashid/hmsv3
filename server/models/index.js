import Sequelize from "sequelize";
import fs from "fs";
import path from "path";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
});

fs.readdir(`${path.resolve()}/models/`, (err, files) => {
  console.log(files);

  files.forEach((file) => {
    if (file !== "index.js") {
      import(`./${file}`).then((model) => {
        model.default(sequelize);
      });
    }
  });
});

// for (let model in models) {
//   console.log(model);
// }

export default sequelize;
