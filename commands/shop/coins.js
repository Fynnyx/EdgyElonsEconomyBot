const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const data = require(`${process.cwd()}/properties.json`)

const options = [
    {
        name: "amount",
        description: "The amount of coins you want to add or remove.",
        type: "NUMBER",
        required: true,
    },
    {
        name: "user",
        description: "The user you want to add or remove coins from.",
        type: "USER",
        required: true,
    },
]

module.exports = {
    name: "coins",
    description: "Give or Remove coins from members.",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "add",
            description: "Add coins to a member.",
            type: "SUB_COMMAND",
            options: options
        },
        {
            name: "remove",
            description: "Remove coins from a member.",
            type: "SUB_COMMAND",
            options: options
        }
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {

        switch (args[0]) {
            case "add":
                
            case "remove":

            default:
        }
        console.log(args);
        await interaction.reply({ content: "Cool" })
    }
}