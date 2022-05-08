const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const { getMoneyFromUser } = require("../../helpers/dbMoney")
const { resetAllDailyChests } = require("../../helpers/dailyreward")
const { writeNewUser, deleteUser } = require("../../helpers/dbUser")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "test",
    description: "Test Command",
    type: 'CHAT_INPUT',

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        try {
            await resetAllDailyChests()
            // const money = await getMoneyFromUser("45177609278573772")
            // console.log(money);
            // deleteUser("451776092785737728")

            await interaction.reply({ content: "money" })
        } catch (err) {
            console.error(err);
        }
    }
}