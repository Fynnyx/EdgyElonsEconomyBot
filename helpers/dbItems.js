const { setTimeout } = require("timers")
const db = require("../handlers/database.js");
const logger = require("../handlers/logger.js");

exports.getItemsByChestId = async (id) => {
    try {
        const result = await db.query(`SELECT chestitems.id, chestitems.item, chestitems.amount, chestitems.probability, chestitems.gif, items.name, items.type , items.value  FROM chestitems LEFT JOIN items ON chestitems.item = items.id WHERE chestitems.chest = ${id}`, { type: db.QueryTypes.SELECT });
        return result;
    } catch (err) {
        logger.error("Error occured while getting items by chest id" + err);
    }
}
