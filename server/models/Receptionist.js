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
=======
 * @param {*} Model
 * @return {Sequelize.Model}
 */
export default function (sequelize, DataTypes, Model) {
  class Receptionist extends Model {
    static associate(models) {
      this.belongsTo(models.Auth);
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }

  Receptionist.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
>>>>>>> 4897f09cde2919a63164130a884f9647f0d99f21
    },
    {
      sequelize,
      modelName: "Receptionist",
      timestamps: false,
    }
  );

  return Receptionist;
}
