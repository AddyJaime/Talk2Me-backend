import User from "@models/userModel";
import Conversation from "@models/conversationModel";
import Chat from "@models/chatModel";

User.hasMany(Conversation, { foreignKey: "userOneId", as: "conversationsOne" });
User.hasMany(Conversation, { foreignKey: "userTwoId", as: "conversationsTwo" });
Conversation.hasMany(Chat, { foreignKey: "conversationId" });
Chat.belongsTo(Conversation, { foreignKey: "conversationId" });
User.hasMany(Chat, { foreignKey: "senderId" });
Chat.belongsTo(User, { foreignKey: "senderId" });

export { User, Conversation, Chat };
