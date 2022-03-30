const db = require("../handlers/database.js");
const logger = require("../handlers/logger.js");

exports.writeNewUser = async (id) => {
    try {
        if (id === undefined || id === null && typeof id !== "string") {
        }
        const result = await db.query(`INSERT INTO user (userid) VALUES ('${id}')`, { type: db.QueryTypes.INSERT })
            .catch(err => {
                logger.error(err);
            });
    } catch (err) {
        logger.error(err);
    }
}

exports.deleteUser = async (id) => {
    try {
        if (id === undefined || id === null && typeof id !== "string") {
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

exports.doesUserExist = async (id) => {
    try{
        if (id === undefined || id === null && typeof id !== "string") {
            return logger.error("Id was provided as undefined, null or not a string");
        }
        const result = await db.query(`SELECT * FROM user WHERE userid = '${id}'`, { type: db.QueryTypes.SELECT })
            .catch(err => {
                logger.error(err);
            });
        if (result == undefined || result.length == 0) {
            return false;
        }
        return true;
    } catch (err) {
        logger.error(err);
    }
}
