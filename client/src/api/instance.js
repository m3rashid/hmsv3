import axios from "axios";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://arcane-wave-41173.herokuapp.com/api"
    : // : "http://localhost:5000/api",
      "http://10.31.5.172:5000/api";

export const instance = axios.create({
  baseURL: baseUrl,
});
