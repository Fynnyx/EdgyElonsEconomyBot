const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const { buyItem } = require("../../helpers/buy")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "buy",
    description: "Buy a item from the shop.",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "item",
            description: "The item you want to buy.",
            type: "STRING",
            required: true,
        }
    ],


    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply()
        const item = args[0]
        await interaction.followUp({ content: await buyItem(item, interaction.user), ephemeral: true })
    }
}