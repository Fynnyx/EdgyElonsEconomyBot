const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require("../handlers/database.js");

class User extends Model {}
User.init(
    {
        userid: DataTypes.STRING,
        fragment: DataTypes.NUMBER,
        gold: DataTypes.NUMBER,
        silver: DataTypes.NUMBER,
    }, {db, modelName: "userid"}
)