import { Sequelize } from "sequelize";

/**
 *
 * @param {*} sequelize
 * @param {*} DataTypes
 * @return {Sequelize.Model}
 */
export default function (sequelize, DataTypes) {
  const Prescription = sequelize.define("Prescription", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    datePrescribed: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateExpiring: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Prescription.associate = function (models) {
    Prescription.belongsTo(models.Patient);
    Prescription.belongsTo(models.Doctor);
    Prescription.hasMany(models.Medicine);
  };

  return Prescription;
}
