import { DataTypes } from "sequelize";
import { sequelize } from "@config/index";

const Conversation = sequelize.define("conversations", {
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
})

export default Conversation
