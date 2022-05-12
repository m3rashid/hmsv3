import { Sequelize } from "sequelize";

/**
 *
 * @param {*} sequelize
 * @param {*} DataTypes
 * @return {Sequelize.Model}
 */
export default function (sequelize, DataTypes) {
  const Appointment = sequelize.define("Appointment", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  });

  Appointment.associate = function (models) {
    Appointment.belongsTo(models.Doctor);
    Appointment.belongsTo(models.Patient);
  };

  return Appointment;
}
