import { Sequelize } from 'sequelize';

require('dotenv').config();


const sequelize = new Sequelize("test", "postgres", "sdi123qwe", {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: 5432
});
module.exports= sequelize
