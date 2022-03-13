import { DataTypes, Sequelize } from "sequelize";

/**
 *
 * @param {*} sequelize
 * @return {Sequelize.Model}
 */
export default function (sequelize) {
  return sequelize.define(
    "Auth",
    {
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "auth",
    }
  );
}
