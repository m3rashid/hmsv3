import { Sequelize } from "sequelize";

/**
 *
 * @param {*} sequelize
 * @param {*} DataTypes
 * @return {Sequelize.Model}
 */
export default function (sequelize, DataTypes) {
  const Doctor = sequelize.define("Doctor", {
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
    availability: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Doctor.associate = function (models) {
    Doctor.belongsTo(models.Auth);
  };

  return Doctor;
}
