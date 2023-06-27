import { DataTypes } from "sequelize";
import sequelize from "./database.config.js";

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    booking: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin:{
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  },
  {
    // define any additional options for your model
    timestamps: false // disable timestamps
  }
);

export default User;
