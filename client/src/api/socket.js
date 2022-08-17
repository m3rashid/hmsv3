import io from "socket.io-client";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://arcane-wave-41173.herokuapp.com"
    : "http://localhost:5000";

export const socket = io(baseUrl, {
  autoConnect: false,
  auth: {
    token: localStorage.getItem("refresh_token"),
  },
});
