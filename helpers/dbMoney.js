const db = require("../handlers/database.js");
const logger = require("../handlers/logger.js");

const { doesUserExist, writeNewUser } = require("./dbUser.js");

exports.getMoneyFromUser = async (id) => {
    try {
        if (id !== undefined || id !== null && typeof id === "string") {
            if (await doesUserExist(id)) {
                const money = await db.query(`SELECT redpill, bluepill FROM user WHERE userid = '${id}'`, { type: db.QueryTypes.SELECT });
                return money[0];
            }
            return { redpill: 0, bluepill: 0 };
        }
    } catch (err) {
        logger.error(err);
    }
}

exports.addMoneyToUser = async (id, amount) => {
    try {
        if (!await doesUserExist(id)) {
            await writeNewUser(id);
        }
        const money = await db.query(`SELECT redpill, bluepill FROM user WHERE userid = '${id}'`, { type: db.QueryTypes.SELECT });
        money[0].redpill += amount.redpill;
        money[0].bluepill += amount.bluepill;
        await db.query(`UPDATE user SET redpill = ${money[0].redpill}, bluepill = ${money[0].bluepill} WHERE userid = '${id}'`);
        return `Added **${amount.redpill}** : __Red Pill/s__ and **${amount.bluepill}** : __Blue Pill/s__ to <@${id}>.`;
    } catch (err) {
        logger.error("While adding Money to User " + err);
        return "Something went wrong while adding money to the user.";
    }

}

exports.removeMoneyFromUser = async (id, amount) => {
    try {
        if (await doesUserExist(id)) {
            const money = await db.query(`SELECT redpill, bluepill FROM user WHERE userid = '${id}'`, { type: db.QueryTypes.SELECT });
            money[0].redpill -= amount.redpill;
            money[0].bluepill -= amount.bluepill;
            await db.query(`UPDATE user SET redpill = ${money[0].redpill}, bluepill = ${money[0].bluepill} WHERE userid = '${id}'`);
            return `Removed **${amount.redpill}** : __Red Pill/s__ and **${amount.bluepill}** : __Blue Pill/s__ from <@${id}>.`;
        }
        return `This user has no pills to remove 😆.`;
    } catch (err) {
        logger.error(err);
        return "Something went wrong while removing money from the user.";
    }
}

exports.hasEnoughMoney = async (id, amount) => {
    try {
        if (await doesUserExist(id)) {
            console.log(amount);
            const money = await db.query(`SELECT redpill, bluepill FROM user WHERE userid = '${id}'`, { type: db.QueryTypes.SELECT });
            console.log(money[0].redpill >= amount.redpill && money[0].bluepill >= amount.bluepill);
            if (money[0].redpill >= amount.redpill && money[0].bluepill >= amount.bluepill) {
                return true;
            }
            return false;
        }
    } catch (err) {
        logger.error(err);
    }
}