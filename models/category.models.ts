import { DataTypes } from "sequelize";
import sequelize from "../configs/database";

const Category=sequelize.define("Category",{
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  title:{
    type:DataTypes.STRING,
    allowNull:false
  },
  image:{
    type:DataTypes.STRING(500)
  },
  description:{
    type:DataTypes.TEXT('long'),
  },
  status:{
    type:DataTypes.STRING(20),
  },
  position:{
    type:DataTypes.INTEGER
  },
  slug:{
    type:DataTypes.STRING,
    allowNull:false
  },
  deleted:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  }
},{
  tableName:'categories',
  timestamps:true
})
export default Category