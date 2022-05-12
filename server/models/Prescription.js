<<<<<<< HEAD
import { Sequelize } from "sequelize";

=======
>>>>>>> 4897f09cde2919a63164130a884f9647f0d99f21
/**
 *
 * @param {*} sequelize
 * @param {*} DataTypes
<<<<<<< HEAD
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
=======
 * @param {*} Model
 * @return {Sequelize.Model}
 */
export default function (sequelize, DataTypes, Model) {
  class Prescription extends Model {
    static associate(models) {
      this.belongsTo(models.Doctor);
      this.belongsTo(models.Patient);
      this.belongsTo(models.Medicine);
    }
  }
>>>>>>> 4897f09cde2919a63164130a884f9647f0d99f21

  Prescription.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    },
    {
      sequelize,
      modelName: "Prescription",
      timestamps: false,
    }
  );

  return Prescription;
}
