import User from "./userModel";
import Conversation from "./conversationModel";
import MessageModel from "./messageModel";

// Conversation Relationship
Conversation.belongsTo(User, {
  foreignKey: "senderId",
  as: "initiator",
})

Conversation.belongsTo(User, {
  foreignKey: "receiverId",
  as: "participant",
})

User.hasMany(Conversation, {
  foreignKey: "senderId",
  as: "sentConversations",
})

User.hasMany(Conversation, {
  foreignKey: "receiverId",
  as: "receivedConversations",
})

// Message
MessageModel.belongsTo(Conversation)
Conversation.hasMany(MessageModel)

MessageModel.belongsTo(User, { foreignKey: "senderId", as: "sender" })
MessageModel.belongsTo(User, { foreignKey: "receiverId", as: "receiver" })




export { User, Conversation };
