const { glob } = require("glob")
const { promisify } = require("util")
const globPromise = promisify(glob)

const { Client } = require("discord.js")
const data = require(`${process.cwd()}/properties.json`)

/**
 * 
 * @param { Client } client 
 */

// Register all SlashCOmmands declared in ../commands
module.exports = async (client) => {
    const slashCommands = await globPromise(
        `${process.cwd()}/commands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        // -- Register for a single guild
        const guild = client.guilds.cache.get(data.guildId);
        await guild.commands.set(arrayOfSlashCommands)
    });
}