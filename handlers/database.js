const { Sequelize, Model, DataTypes } = require('sequelize');

const db = new Sequelize(process.env.DBURI);

try {
    db.authenticate()
    console.info('Connection has been established successfully.');
    module.exports = db;
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
