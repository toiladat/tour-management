import sequelize from "../configs/database";
import { DataTypes } from "sequelize";
const Order=sequelize.define('Order',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  code:{
    type:DataTypes.STRING(10),
    allowNull:false
  },
  fullName:{
    type:DataTypes.STRING(50),
    allowNull:false
  },
  phone:{
    type:DataTypes.STRING(10),
    allowNull:false
  },
  note:{
    type:DataTypes.STRING(500)
  },
  status:{
    type:DataTypes.STRING(50)
  },
  deleted:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  },
  deletedAt:{
    type:DataTypes.DATE
  },
  createdAt:{
    type:DataTypes.DATE
  },
  updatedAt:{
    type:DataTypes.DATE
  }
},{
  tableName:'orders',
  timestamps:true
})
export default Order