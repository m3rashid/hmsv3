const isProduction = process.env.NODE_ENV === "production";

const corsOrigin = isProduction
  ? ["https://admin.socket.io", "https://ansarihms.surge.sh"]
  : // [
    // "https://admin.socket.io",
    // "http://localhost:3000",
    // "http://10.31.5.172:3000",
    "*";
// ];

module.exports = {
  isProduction,
  corsOrigin,
};
