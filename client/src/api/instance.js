import axios from "axios";

import { baseUrl } from "./socket";

export const instance = axios.create({
  baseURL: baseUrl,
});
