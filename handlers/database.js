const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = async () => {
    const db = new Sequelize(process.env.DBURI);

    try {
        db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
