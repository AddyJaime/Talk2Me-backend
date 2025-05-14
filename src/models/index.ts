import User from "./userModel";
import Friendship from "./friendshipModel";

User.hasMany(Friendship, { foreignKey: "userId", as: 'sentRequests' })
User.hasMany(Friendship, { foreignKey: 'friendId', as: "receivedRequests" })
Friendship.belongsTo(User, { foreignKey: "userId", as: 'sender' })
Friendship.belongsTo(User, { foreignKey: 'friendId', as: 'receiver' })




export { User, Friendship };
