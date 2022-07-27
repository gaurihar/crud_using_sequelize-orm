const Sequelize = require('sequelize')
const mysql = require('mysql2')
const config = require('../config/database.json')


const { database, username, password, dialect, host } = config.development;


//Creating a sequelize object for DB connection
// const sequelize = new Sequelize(
//    database,
//    user,
//    password, {
//       dialect,
//       host
//    }
// );



const sequelize = new Sequelize(
   database, username, password, {
   dialect: dialect,
   host: host, //Optional 
});


// sequelize
//   .sync()
// //.sync({force: true})
//   .catch((err) => {
//     console.log(err);
//   });


module.exports = sequelize