const db = require("../handlers/database.js");
const logger = require("../handlers/logger.js");

exports.getShopItems = async () => {
    try {
        const items = await db.query(`SELECT * FROM shop`, { type: db.QueryTypes.SELECT });
        return items;
    } catch (err) {
        logger.error("Error occured while getting shop items" + err);
    }
}