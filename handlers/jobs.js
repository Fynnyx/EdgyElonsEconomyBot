const cron = require('node-cron');
const { openShop, closeShop } = require('../helpers/shop.js');
const { sleep } = require('../helpers/sleep.js');
const data = require(`${process.cwd()}/properties.json`);


cron.schedule("8 * * * *", function resetDailyChest() {
    console.log("Running a task every day at 8:00");
})

cron.schedule("8 * * * *", async function shop() {
    await openShop();
    await sleep(data.shop.durationMin * 60);
    await closeShop();
})

cron.schedule("18 * * * *", async function shop() {
    await openShop();
    await sleep(data.shop.durationMin * 60);
    await closeShop();
})