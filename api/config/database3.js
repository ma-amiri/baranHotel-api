import Sequelize  from 'sequelize'
// Create a new Sequelize instance
const sequelize = new Sequelize('hotel_reservation', 'root', 'baran123', {
    host: 'localhost',
    dialect: 'mysql'
  });
  
  //Replace database_name, username and password with your actual MySQL database credentials
  // test the connection
  
  // Test the database connection
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
  // Export the Sequelize instance
 export default sequelize;
  