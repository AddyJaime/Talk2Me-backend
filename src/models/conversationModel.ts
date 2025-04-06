import { DataTypes, Model } from "sequelize";
import { sequelize } from "@config/index";
import { User } from "@models";

class Conversation extends Model {
  public id!: number;
  public userOneId!: number;
  public userTwoId!: number;
  public lastMessageId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Conversation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userOneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    userTwoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    lastMessageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Conversation",
    tableName: "conversations",
    timestamps: true,
  }
);
export default Conversation;
