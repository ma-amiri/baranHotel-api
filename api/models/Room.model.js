import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

 const Room = sequelize.define('Room', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  maxPeople: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

 export const RoomNumber = sequelize.define('RoomNumber', {
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unavailableDates: {
    type: DataTypes.ARRAY(DataTypes.DATE),
  },
});

Room.hasMany(RoomNumber, { foreignKey: 'roomId', as: 'roomNumbers' });
RoomNumber.belongsTo(Room, { foreignKey: 'roomId' });


export default Room;