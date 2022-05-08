const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const logger = require("../../handlers/logger")
const data = require(`${process.cwd()}/properties.json`)

const { getMoneyFromUser } = require("../../helpers/dbMoney")

module.exports = {
    name: "wallet",
    description: "Show your wallet.",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "user",
            description: "Select another user",
            type: "USER",
            required: false
        }
    ],


    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        try {

            var user
            var money
            var title
            var desc

            if (args[0] === undefined) {
                user = interaction.user
                money = await getMoneyFromUser(user.id)
                title = `- Your Wallet -`
                desc = `With your money you can buy items in the shop.\n**use **${"`"}/shop${"`"}`
            } else {
                user = await client.users.fetch(args[0])
                money = await getMoneyFromUser(args[0])
                title = `- Wallet from ${user.tag} -`
                desc = `With your money you can buy items in the shop.\n**use **${"`"}/shop${"`"}`



            }
            const walletEmbed = new MessageEmbed()
                .setTitle(title)
                .setDescription(desc)
                .setColor(data.style.colors.red)
                .setThumbnail(user.displayAvatarURL())
                .setFields([
                    {
                        name: "Red Pill/s",
                        value: `${money.redpill}`,
                        inline: true
                    },
                    {
                        name: "Blue Pill/s",
                        value: `${money.bluepill}`,
                        inline: true
                    }
                ])
            await interaction.reply({ embeds: [walletEmbed] })
        } catch (error) {
            logger.error(error)
            interaction.reply({ content: "An error occured!", ephemeral: true })
        }
    }
}