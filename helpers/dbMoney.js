const db = require("../handlers/database.js");
const logger = require("../handlers/logger.js");

const { doesUserExist, writeNewUser } = require("./dbUser.js");

exports.getMoneyFromUser = async (id) => {
    try {
        if (id !== undefined || id !== null && typeof id === "string") {
            if (await doesUserExist(id)) {
                const money = await db.query(`SELECT fragment, gold, silver FROM user WHERE userid = '${id}'`, { type: db.QueryTypes.SELECT });
                return money[0];
            }
            return { fragment: 0, gold: 0, silver: 0 }
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
        const money = await db.query(`SELECT fragment, gold, silver FROM user WHERE userid = '${id}'`, { type: db.QueryTypes.SELECT });
        money[0].fragment += amount.fragment;
        money[0].gold += amount.gold;
        money[0].silver += amount.silver;
        await db.query(`UPDATE user SET fragment = ${money[0].fragment}, gold = ${money[0].gold}, silver = ${money[0].silver} WHERE userid = '${id}'`);
        return `Added **${amount.fragment}** : __Fragments__, **${amount.gold}** : __Gold__ and **${amount.silver}** : __Silver__ to <@${id}>.`;
    } catch (err) {
        logger.error("While adding Money to User " + err);
        return "Something went wrong while adding money to the user.";
    }

}

exports.removeMoneyFromUser = async (id, amount) => {
    try {
        if (doesUserExist(id)) {
            const money = await db.query(`SELECT fragment, gold, silver FROM user WHERE userid = '${id}'`, { type: db.QueryTypes.SELECT });
            money[0].fragment -= amount.fragment;
            money[0].gold -= amount.gold;
            money[0].silver -= amount.silver;
            await db.query(`UPDATE user SET fragment = ${money[0].fragment}, gold = ${money[0].gold}, silver = ${money[0].silver} WHERE userid = '${id}'`);
            return `Removed **${amount.fragment}** : __Fragments__, **${amount.gold}** : __Gold__ adnd **${amount.silver}** : __Silver__ from <@${id}>.`;
        }
        return `This user has no money to remove 😆.`;
    } catch (err) {
        logger.error(err);
        return "Something went wrong while removing money from the user.";
    }
}