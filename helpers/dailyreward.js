const db = require("../handlers/database");
const { buyItem } = require("./buy");

exports.getdailyreward = async (user) => {

    dailychest = db.query(`SELECT hasdailychest FROM user WHERE userid = '${user}'`, { type: db.QueryTypes.SELECT });

    if (dailychest == 0){
        db.query(`UPDATE user SET hasdailychest = 1 WHERE userid = '${user}'`), { type: db.QueryTypes.UPDATE };
        await buyItem("Daily Chest", user)

    } else{
        return "You already got your daily reward!";
    }

}
