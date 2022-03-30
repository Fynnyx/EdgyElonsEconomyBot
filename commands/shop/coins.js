const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const logger = require("../../handlers/logger")
const { addMoneyToUser, removeMoneyFromUser } = require("../../helpers/dbMoney")
const data = require(`${process.cwd()}/properties.json`)

const options = [
    {
        name: "fragments",
        description: "The amount of fragments you want to add or remove.",
        type: "NUMBER",
        required: true,
    },
    {
        name: "gold",
        description: "The amount of gold you want to add or remove.",
        type: "NUMBER",
        required: true,
    },
    {
        name: "silver",
        description: "The amount of silver you want to add or remove.",
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
    userPermissions: ["ADMINISTRATOR"],
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
        try {
            const userid =interaction.options._hoistedOptions[3].user.id
            const fragment = interaction.options._hoistedOptions[0].value
            const gold = interaction.options._hoistedOptions[1].value
            const silver = interaction.options._hoistedOptions[2].value

            switch (args[0]) {
                case "add":
                    interaction.reply({ content: await addMoneyToUser(userid, { fragment: fragment, gold: gold, silver: silver }), ephemeral: true })
                    break;
                case "remove":
                    interaction.reply({ content: await removeMoneyFromUser(userid, { fragment: fragment, gold: gold, silver: silver }), ephemeral: true })
                    break;
                default:
            }
        } catch (err) {
            logger.error(err);
        }
    }
}