import { DataTypes } from "sequelize";
import sequelize from "../configs/database";
const TourCategory=sequelize.define('TourCategory',{
  tour_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
    references:{
      model:'tours',//Ten bang ma khoa ngoai tham chieu den
      key:'id'// ten truong trong bang ma khoa ngoai tham chieu den
    }
  },
  category_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
    references:{
      model:'categories',
      key:'id'
    }
  }
},{
  tableName:'tours_categories',
  timestamps:false
})
export default TourCategory