const db = require("../handlers/database.js");
const logger = require("../handlers/logger.js");

exports.getChestByName = async (name) => {
    try {
        const chest = await db.query(`SELECT * FROM chest WHERE name = '${name}'`, { type: db.QueryTypes.SELECT });
        return chest[0];
    } catch (err) {
        logger.error("Error occured while getting chest by name " + err);
    }
}

exports.getAllChests = async () => {
    try {
        const chests = await db.query(`SELECT * FROM chest`, { type: db.QueryTypes.SELECT });
        return chests;
    } catch (err) {
        logger.error("Error occured while getting all chests " + err);
    }
}