const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const { getMoneyFromUser } = require("../../helpers/dbMoney")
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
            // const money = await getMoneyFromUser("45177609278573772")
            // console.log(money);
            writeNewUser("451776092785737728")
            // deleteUser("451776092785737728")

            await interaction.reply({ content: "money" })
        } catch (err) {
            console.error(err);
        }
    }
}