import { DataTypes, Sequelize } from "sequelize";
/**
 *
 * @param {*} sequelize
 * @return {Sequelize.Model}
 */
export default function (sequelize) {
  const Receptionist = sequelize.define("Receptionist", {
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
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Receptionist.associate = function (models) {
    Receptionist.belongsTo(models.Auth);
  };

  return Receptionist;
}