// const {} = require("../../services");

// const createUser = async ({ email, password, role, name }) => {
//   try {
//     const { user } = await createUserService(email, password, role, name);
//     console.log(user);
//     io.emit("user-created", { user });
//   } catch (err) {
//     console.log(err);
//     io.emit("error", {
//       message: err.message || "An error occured",
//     });
//   }
// };

// module.exports = {
//   createUser,
// };
