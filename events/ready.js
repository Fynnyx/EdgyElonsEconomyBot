const client = require("../index.js")
const logger = require("../handlers/logger.js")
const data = require(`${process.cwd()}/properties.json`)


client.on("ready", () => {
    try {
        console.info(`\x1b[33m${client.user.username}\x1b[34m, logged in\x1b[0m`)
        client.user.setActivity({ type: data.status.type, name: data.status.value })
    } catch {
        logger.error("Failed to start bot, \n" + err)
    }
})