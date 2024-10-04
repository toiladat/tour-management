
import { DataTypes } from "sequelize";
import sequelize from "../configs/database";

const Tour = sequelize.define("Tour", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(10),
  },
  images: {
    type: DataTypes.TEXT('long'),
  },
  price: {
    type: DataTypes.INTEGER,
  },
  discount: {
    type: DataTypes.INTEGER,
  },
  information: {
    type: DataTypes.TEXT('long'),
  },
  schedule: {
    type: DataTypes.TEXT('long'),
  },
  timeStart: {
    type: DataTypes.DATE,
  },
  stock: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING(20),
  },
  position: {
    type: DataTypes.INTEGER,
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Đặt giá trị mặc định là false
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'tours',
  timestamps: true, // Tự động quản lý createdAt và updatedAt
});

export default Tour;