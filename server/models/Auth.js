import { DataTypes, Sequelize } from "sequelize";

/**
 *
 * @param {*} sequelize
 * @return {Sequelize.Model}
 */

export default function (sequelize) {
  const Auth = sequelize.define("Auth", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM("DOCTOR", "ADMIN", "RECEPTIONIST", "OTHER"),
      defaultValue: "OTHER",
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Auth;
}
