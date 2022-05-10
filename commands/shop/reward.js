const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const { getDailyReward, hasDailyReward } = require("../../helpers/dailyreward")
const { doesUserExist } = require("../../helpers/dbUser")
const logger = require("../../handlers/logger")

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
        try {
            switch (args[0]) {
                case "daily":
                    await interaction.deferReply({ephemeral: true})
                    if (!await doesUserExist(interaction.user.id)) {
                        await writeNewUser(interaction.user.id)
                    }
                    if (await hasDailyReward(interaction.user.id)) {
                        return interaction.followUp({content: "You already got your daily reward.", ephemeral: true})
                    }
                    const result = await getDailyReward(interaction.user)
                    if (result == undefined) {
                        return interaction.followUp({ content: `⛔ - Something went wrong while buying the item\n*- Try to unblock the bot.*` })
                    }
                    await interaction.followUp({ files: [`./assets/chests/${result}.gif`], ephemeral: true })
                    break;
                default:
                    interaction.followUp({content: "⛔ - This reward cant be found."})
            }
        } catch (error) {
            logger.error(error)
            interaction.followUp({ content: "An error occured!", ephemeral: true })
        }
    }
}