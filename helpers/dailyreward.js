const db = require("../handlers/database");
const { buyItem } = require("./buy");

exports.getDailyReward = async (user) => {
    const result = buyItem("Daily Chest", user)
    db.query(`UPDATE user SET hasdailychest = 1 WHERE userid = '${user.id}'`), { type: db.QueryTypes.UPDATE };
    return result
}

exports.hasDailyReward = async (userid) => {
    const hasdailychest = await db.query(`SELECT hasDailyChest FROM user WHERE userid = '${userid}'`, { type: db.QueryTypes.SELECT });
    if (hasdailychest[0].hasDailyChest == 0) {
        return false
    }
    return true
}

exports.resetAllDailyChests = async () => {
    const rewardedUsers = await db.query(`SELECT * FROM user WHERE hasDailyChest = true`, { type: db.QueryTypes.SELECT })
    for (user of rewardedUsers) {
        await db.query(`UPDATE user SET hasDailyChest = 0 WHERE userid = ${user.userid}`, { type: db.QueryTypes.UPDATE });
    }
}