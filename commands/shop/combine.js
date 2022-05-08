const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const logger = require("../../handlers/logger")
const data = require(`${process.cwd()}/properties.json`)
const { addMoneyToUser, removeMoneyFromUser } = require("../../helpers/dbMoney")
const { hasEnoughMoney } = require("../../helpers/dbMoney")

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
        try {
            switch (args[0]) {
                case "redpills":
                    if (!await hasEnoughMoney(interaction.user.id, {redpill: args[1], bluepill: 0})) {
                        return await interaction.reply({ content: "You don't have enough money!", ephemeral: true })
                    }
                    const rpFinalAmount = args[1] * data.shop.combineValue

                    await removeMoneyFromUser(interaction.user.id, { redpill: args[1], bluepill: 0 })
                    await addMoneyToUser(interaction.user.id, { redpill: 0, bluepill: rpFinalAmount })
                    await interaction.reply({ content: `You combined **${args[1]}** red pills to get **${rpFinalAmount}** blue pills.`, ephemeral: true })
                    break;
                case "bluepills":
                    if (args[1] % data.shop.combineValue !== 0) {
                        return await interaction.reply({ content: `You can only combine pills that are a multiple of **${data.shop.combineValue}**.`, ephemeral: true })
                    }
                    if (!await hasEnoughMoney(interaction.user.id, { redpill: 0, bluepill: args[1] })) {
                        return await interaction.reply({ content: "You don't have enough money!", ephemeral: true })
                    }
                    const bpFinalAmount = args[1] / data.shop.combineValue

                    await removeMoneyFromUser(interaction.user.id, { redpill: 0, bluepill: args[1] })
                    await addMoneyToUser(interaction.user.id, { redpill: bpFinalAmount, bluepill: 0 })
                    await interaction.reply({ content: `You combined **${args[1]}** blue pills to get **${bpFinalAmount}** red pills.`, ephemeral: true })
                    break;
                default:
                    return interaction.reply({ content: `Your used pill type is not valid\n**You used:** ${args[0]}.`, ephemeral: true })

            }
        } catch (error) {
            logger.error(error)
            interaction.reply({ content: "An error occured!", ephemeral: true })
        }
    }
}