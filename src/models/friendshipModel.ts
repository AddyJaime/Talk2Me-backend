import { DataTypes, Model } from "sequelize";
import { sequelize } from "@config/index";
import User from "./userModel";



class Friendship extends Model {
  public id!: number;
  public userId!: number
  public friendId!: number
  public status!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}


Friendship.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  }
  ,
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  },


},

  {
    sequelize,
    modelName: "Friendship",
    tableName: "friendships",
    timestamps: true

  }
)



export default Friendship