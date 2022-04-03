import express from "express";
import "dotenv/config";

import models from "./models/index.js";
import AuthRoutes from "./routes/auth.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", AuthRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

(async () => {
  try {
    await models.sequelize.sync({
      alter: true,
    });
    await models.sequelize.authenticate({ logging: false });

    // console.log(models.sequelize.models);

    console.log("Connection has been established successfully");

    app.listen(PORT, () => {
      console.log(`Server on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
