import axios from "axios";

export const SERVER_ROOT_URL = "http://10.31.5.172:5000";
// process.env.NODE_ENV === "production"
//   ? "https://arcane-wave-41173.herokuapp.com"
//   : "http://localhost:5000";

export const instance = axios.create({
  baseURL: SERVER_ROOT_URL + "/api",
});
