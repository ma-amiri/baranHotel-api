import { Sequelize } from 'sequelize';

export default new Sequelize({
    host: 'localhost',
    dialect: 'mysql', 
    username: 'hicoders',
    password: 'hicoders_12',
    database: 'fishy'
  });