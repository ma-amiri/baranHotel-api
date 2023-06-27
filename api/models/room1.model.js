import { DataTypes } from "sequelize";
import sequelize  from '../config/connection.js';

// sequlize model which maps/corresponds to the table in the database
const Room = sequelize.define(
  "Room",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
   
   location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rentPerDay: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageUrl: [],
    currentbookings: [],
    Type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    
    timestamps: false // disable timestamps
  }
);

export default Room;
