import { Sequelize } from "sequelize";

/**
 *
 * @param {*} sequelize
 * @param {*} DataTypes

 * @return {Sequelize.Model}
 */
export default function (sequelize, DataTypes) {
  const Medicine = sequelize.define("Medicine", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  });

  return Medicine;
}
