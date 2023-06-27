import sequelize from "./connection.js";
import Hotel from "../models/Hotel.model.js"
import Room from "../models/Room.model.js"
import User from "../models/User.model.js";


// ****************************

Hotel.hasMany(Room, { foreignKey: 'hotelId' }); // A hotel can have multiple rooms
Room.belongsTo(Hotel, { foreignKey: 'hotelId' }); // A room belongs to a hotel

User.hasMany(Room,{foreignKey: 'userId'}); // A user can have multiple rooms
Room.belongsTo(User,{foreignKey: 'userId'}); // A room belongs to a user


// ****************************

const connectToDatabase = async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync({altercl: true});
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };
  connectToDatabase();


