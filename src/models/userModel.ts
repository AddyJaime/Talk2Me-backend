import { DataTypes, Model } from "sequelize";
import { sequelize } from "@config/index";

class User extends Model {
  public id!: number;
  public fullName!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(225),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: "Users",
    tableName: "Users",
    timestamps: true,
  }
);
