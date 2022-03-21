const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "coins",
    description: "Give or Remove coins from members.",
    type: 'CHAT_INPUT',

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        
        await interaction.reply({ content: "Cool" })
    }
}