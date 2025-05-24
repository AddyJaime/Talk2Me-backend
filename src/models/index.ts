import User from "./userModel";
import Friendship from "./friendshipModel";
import Conversation from "./conversationModel";

User.hasMany(Friendship, { foreignKey: "userId", as: 'sentRequests' })
User.hasMany(Friendship, { foreignKey: 'friendId', as: "receivedRequests" })
Friendship.belongsTo(User, { foreignKey: "userId", as: 'sender' })
Friendship.belongsTo(User, { foreignKey: 'friendId', as: 'receiver' })

Conversation.belongsTo(User, {
  foreignKey: "senderId",
  as: "sender",
})

Conversation.belongsTo(User, {
  foreignKey: "receiverId",
  as: "receiver",
})

User.hasMany(Conversation, {
  foreignKey: "senderId",
  as: "sentConversations",
})

User.hasMany(Conversation, {
  foreignKey: "receiverId",
  as: "receivedConversations",
})




export { User, Friendship, Conversation };
