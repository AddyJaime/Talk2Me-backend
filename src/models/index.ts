import User from "./userModel";
import Friendship from "./friendshipModel";
// import Conversation from "./conversationModel";
// import Chat from "./chatModel";

// User.hasMany(Conversation, { foreignKey: "userOneId", as: "conversationsOne" });
// User.hasMany(Conversation, { foreignKey: "userTwoId", as: "conversationsTwo" });
// Conversation.hasMany(Chat, { foreignKey: "conversationId" });
// Chat.belongsTo(Conversation, { foreignKey: "conversationId" });
// User.hasMany(Chat, { foreignKey: "senderId" });
// Chat.belongsTo(User, { foreignKey: "senderId" });

// cada usuario tiene  muchas amistades 
// foreignKey es el nombre de la columna en friendship que conecta user 
// y esas amistades estan conectadas usando la columna userID en la tabla friendship
// y esta relacion se va a llamar sentRequests
User.hasMany(Friendship, { foreignKey: "userId", as: 'sentRequests' })
User.hasMany(Friendship, { foreignKey: 'friendId', as: "receivedRequests" })
Friendship.belongsTo(User, { foreignKey: "userId", as: 'sender' })
Friendship.belongsTo(User, { foreignKey: 'friendId', as: 'receiver' })




export { User, Friendship };
