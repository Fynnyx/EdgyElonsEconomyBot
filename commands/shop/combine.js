const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const data = require(`${process.cwd()}/properties.json`)

const { getMoneyFromUser } = require("../../helpers/dbMoney")

const option = [
    {
        name: "amount",
        description: "Select the amount of pills you want to get.",
        type: "NUMBER",
    }
]

module.exports = {
    name: "combine",
    description: "Combine Pills to get other Pills.",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "redpills",
            description: "Combine red pills to get blue pills.",
            type: "SUB_COMMAND",
            options: option
        },
        {
            name: "bluepills",
            description: "Combine blue pills to get red pills.",
            type: "SUB_COMMAND",
            options: option
        },
    ],


    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        
        await interaction.reply({ embeds: [walletEmbed] })
    }
}