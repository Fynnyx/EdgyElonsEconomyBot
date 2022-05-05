const client = require("../index.js")
const logger = require("../handlers/logger.js")
const data = require(`${process.cwd()}/properties.json`)


client.on("ready", () => {
    try {
        console.info(`\x1b[33m${client.user.username}\x1b[34m, logged in\x1b[0m`)
        client.user.setActivity({ type: data.status.type, name: data.status.value })
        require("../handlers/jobs.js")
        console.info(`\x1b[32m✅ - Jobs loaded\x1b[0m`)
    } catch (err) {
        logger.error("Failed to start bot, \n" + err)
    }
})