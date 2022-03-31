const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const { getAllChests } = require("../../helpers/dbChests")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "shop",
    description: "Buy a item from the shop.",
    type: 'CHAT_INPUT',


    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const shopEmbed = new MessageEmbed()
            .setTitle("EdgyElon - Shop")
            .setDescription("alksdjalksd")
            .setColor(data.style.colors.red)

            const allChests = await getAllChests();

            allChests.forEach(async (chest) => {
                shopEmbed.addField(chest.name, `${chest.description}\n\n•`, true);
            })

            // shopEmbed.addFields(
            //     { name: "Chest (200 Red Pills)", value: "• Invite - 15%\n• Whitelist - 50%", inline: true },
            //     { name: "Chest (500 Red Pills)", value: "• Invite - 25%\n• Whitelist - 75%", inline: true },
            // )

        await interaction.reply({ embeds: [shopEmbed] })
    }
}