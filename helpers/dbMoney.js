const { setTimeout } = require("timers")
const db = require("../handlers/database.js");

exports.getMoneyFromUser = async (id) => {
    try {
        if (id !== undefined || id !== null && typeof id === "string") {
            const money = await db.query(`SELECT fragment, gold, silver FROM user WHERE userid = '${id}'`, { type: db.QueryTypes.SELECT });
            console.log(money);
            if (money === undefined) {
                money = {fragment: 0, gold: 0, silver: 0}
                return money;
            }
            return money[0];
        }
        console.error("Id not provided");
    } catch (err) {
        console.error(err);
    }
}