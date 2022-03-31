const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "reward",
    description: "Buy a item from the shop.",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "daily",
            description: "Daily Reward",
            type: "SUB_COMMAND"
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        switch (args[1]) {
            case "daily":
                
                break;
            default:
        }
        await interaction.reply({ embeds: [shopEmbed] })
    }
}