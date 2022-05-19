/**
 * All the app config goes here
 * Make necessary modifications
 */

export const ROOT_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

export const SOCKET_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";