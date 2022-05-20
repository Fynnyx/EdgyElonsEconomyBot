const cron = require('node-cron');
const { openShop, closeShop } = require('../helpers/shop.js');
const { resetAllDailyChests } = require("../helpers/dailyreward")
const { sleep } = require('../helpers/sleep.js');
const logger = require('./logger.js');
const data = require(`${process.cwd()}/properties.json`);


cron.schedule("0 8 * * *", async function resetDailyChest() {
    try {
        await resetAllDailyChests()
    } catch (e) {
        logger.error(e)
    }
}, {
    timezone: "Europe/Zurich"
})

cron.schedule("0 8 * * *", async function shop() {
    try {
        await openShop();
        await sleep(data.shop.durationMin * 60);
        await closeShop();
    } catch (e) {
        logger.error(e)
    }
}, {
    timezone: "Europe/Zurich"
})

cron.schedule("0 12 * * *", async function shop() {
    try {
        await openShop();
        await sleep(data.shop.durationMin * 60);
        await closeShop();
    } catch (e) {
        logger.error(e)
    }
}, {
    timezone: "Europe/Zurich"
})

cron.schedule("0 20 * * *", async function shop() {
    try {
        await openShop();
        await sleep(data.shop.durationMin * 60);
        await closeShop();
    } catch (e) {
        logger.error(e)
    }
}, {
    timezone: "Europe/Zurich"
})