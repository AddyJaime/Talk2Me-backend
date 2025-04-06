import { DataTypes, Model } from "sequelize";
import { sequelize } from "@config/index";
import { Conversation, User } from "@models";

class Chat extends Model {
  public id!: number;
  public conversationId!: number;
  public senderId!: number;
  public text!: string;
  public createdAt!: Date;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    conversationId: {
      type: DataTypes.INTEGER,
      references: { model: Conversation, key: "id" },
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Chat",
    tableName: "chats",
    timestamps: true,
  }
);

export default Chat;
