import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server ready at: http://localhost:", port));
