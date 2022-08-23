import axios from "axios";

export const SERVER_ROOT_URL =
  process.env.NODE_ENV === "production"
    ? "https://arcane-wave-41173.herokuapp.com"
    : "http://localhost:5000";

export const instance = axios.create({
  baseURL: SERVER_ROOT_URL + "/api",
});
