const { setTimeout } = require("timers")
const db = require("../handlers/database.js");
const logger = require("../handlers/logger.js");

exports.getShopItems = async (name) => {
    try {
        if (name !== undefined || name !== null && typeof name === "string") {
            const items = await db.query(`SELECT * FROM shop WHERE name = '${name}'`, { type: db.QueryTypes.SELECT });
            return items;
        } else {
            const items = await db.query(`SELECT * FROM shop`, { type: db.QueryTypes.SELECT });
            return items;
        }
    } catch (err) {
        logger.error("Error occured while getting shop items" + err);
    }
}