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
    }
}