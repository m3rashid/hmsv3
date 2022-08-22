import io from "socket.io-client";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://arcane-wave-41173.herokuapp.com/api"
    : // : "http://localhost:5000/api",
      "http://192.168.156.113:5000/api";

export const socket = io(baseUrl, {
  autoConnect: false,
  auth: {
    token: localStorage.getItem("refresh_token"),
  },
});
