import { DataTypes } from "sequelize";
import { sequelize } from "@config/index";



const MessageModel = sequelize.define("messages", {
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})


export default MessageModel
