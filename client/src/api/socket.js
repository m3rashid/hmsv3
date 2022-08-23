import io from "socket.io-client";

import { SERVER_ROOT_URL } from "./instance";

export const socket = io(SERVER_ROOT_URL, {
  autoConnect: false,
  auth: {
    token: localStorage.getItem("refresh_token"),
  },
});
