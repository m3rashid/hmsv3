import { Sequelize } from "sequelize";

/**
 *
 * @param {*} sequeliz
 * @param {*} DataTypes
 * @return {Sequelize.Model}
 */

export default function (sequelize, DataTypes) {
  const Auth = sequelize.define("Auth", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
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
