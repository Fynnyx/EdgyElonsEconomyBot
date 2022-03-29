const { setTimeout } = require("timers")
const db = require("../handlers/database.js");
const logger = require("../handlers/logger.js");

exports.writeNewUser = async (id) => {
    try {
        if (id === undefined || id === null && typeof id !== "string") {
            return console.error("Id not provided");
        }
        const result = await db.query(`INSERT INTO user (userid) VALUES ('${id}')`, { type: db.QueryTypes.INSERT })
            .catch(err => {
                logger.error(err);
            });
        console.log(result);

    } catch (err) {
        logger.error(err);
    }
}

exports.deleteUser = async (id) => {
    try {
        if (id === undefined || id === null && typeof id !== "string") {
            return console.error("Id not provided");
        }
        await db.query(`DELETE FROM user WHERE userid = '${id}'`, { type: db.QueryTypes.DELETE })
            .then(() => {
                logger.info("User deleted with id: " + id);
            })
            .catch(err => {
                logger.error(err);
            });

    } catch (err) {
        logger.error(err);
    }
}
