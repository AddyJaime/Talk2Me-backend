import { DataTypes, Model } from "sequelize";
import { sequelize } from "@config/index";

// Este modelo representa una relación de amistad entre dos usuarios
// extienede de modelo porque asi Model le da acceso a sequilize a usar metodos como findOne, create,update 

class Friendship extends Model {
  public id!: number;
  public userId!: number
  public friendId!: number
  public status!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

// aqui estamos connectando el modelo con la base de dato, aqui estamos definiendo las columan de la base de dato 
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
      model: "User",
      key: "id"
    }
  }
  ,
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User",
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