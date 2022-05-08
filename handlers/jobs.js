const cron = require('node-cron');
const { openShop, closeShop } = require('../helpers/shop.js');
const { resetAllDailyChests } = require("../helpers/dailyreward")
const { sleep } = require('../helpers/sleep.js');
const data = require(`${process.cwd()}/properties.json`);


cron.schedule("0 17 * * *", function resetDailyChest() {
    await resetAllDailyChests()
},{
    timezone: "Europe/Zurich"
})

cron.schedule("0 13 * * *", async function shop() {
    await openShop();
    await sleep(data.shop.durationMin * 60);
    await closeShop();
},{
    timezone: "Europe/Zurich"
})

cron.schedule("0 18 * * *", async function shop() {
    await openShop();
    await sleep(data.shop.durationMin * 60);
    await closeShop();
},{
    timezone: "Europe/Zurich"
})