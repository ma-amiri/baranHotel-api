import { Sequelize, DataTypes }  from 'sequelize';
import sequelize  from '../config/connection.js';

const Hotel = sequelize.define('Hotel', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  distance: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photos: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // rating: {
  //   type: DataTypes.FLOAT,
  //   allowNull: true,
  //   validate: {
  //     min: 0,
  //     max: 5,
  //   },
  // },
  rooms: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  cheapestPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // featured: {
  //   type: DataTypes.BOOLEAN,
  //   defaultValue: false,
  // },
});

export default Hotel;
