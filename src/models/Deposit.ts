import { DataTypes, Model } from "sequelize";
import sequelize from "../shared/connection.js";

class Deposit extends Model {
  public id!: number;
  public clientId!: number;
  public operation!: Date;
  public DepositivValue!: number;
}

Deposit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    operation: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    DepositivValue: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Deposit",
    tableName: "deposit",
    underscored: true,
  }
);

export default Deposit;
