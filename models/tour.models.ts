import { DataType, DataTypes } from "sequelize";
import sequelize from "../configs/database";

const Tour = sequelize.define("Tour", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  code: DataTypes.STRING(10),
  images: DataTypes.TEXT("long"),
  price: DataTypes.INTEGER,
  discout: DataTypes.INTEGER,
  information: DataTypes.TEXT('long'),
  schedule: DataTypes.TEXT("long"),
  timeStart: DataTypes.DATE,
  stock: DataTypes.INTEGER,
  status: DataTypes.STRING(20),
  position: DataTypes.INTEGER,
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  deleted: DataTypes.DATE,
}, {
  tableName: 'tours', // ten trong csdl
  timestamps: true// quan ly createdAt va updatedAt
})
export default Tour