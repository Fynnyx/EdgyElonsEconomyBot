const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
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
        const walletEmbed = new MessageEmbed()

        if (args[0] === undefined) {
            const money = await getMoneyFromUser(interaction.user.id)
            console.log(money);
                walletEmbed
                    .setTitle("- Your Wallet -")
                    .setDescription("With your money you can buy items from the shop.\n*use *`/shop`")
        } else {
            const money = await getMoneyFromUser(args[0])
            const user = await client.users.fetch(args[0])
            console.log(user);
            console.log(money);
            
            walletEmbed
                .setTitle("- Wallet from -")
        }
        await interaction.reply({ embeds: [walletEmbed] })
    }
}