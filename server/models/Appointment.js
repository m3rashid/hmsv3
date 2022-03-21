import { DataTypes, Sequelize } from "sequelize";

/**
 *
 * @param {*} sequelize
 * @return {Sequelize.Model}
 */
export default function (sequelize) {
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
