import io from "socket.io-client";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://arcane-wave-41173.herokuapp.com/api"
    : // : "http://localhost:5000/api",
      "http://10.31.5.172:5000";

export const socket = io(baseUrl, {
  autoConnect: false,
  auth: {
    token: localStorage.getItem("refresh_token"),
  },
});
