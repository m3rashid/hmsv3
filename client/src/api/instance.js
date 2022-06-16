import axios from "axios";

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://arcane-wave-41173.herokuapp.com/api"
      : "http://localhost:5000/api",
});
