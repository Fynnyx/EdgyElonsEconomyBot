const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const { getAllChests } = require("../../helpers/dbChests")
const { getItemsByChestId } = require("../../helpers/dbItems")
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
            .setTitle("Keymaker`s - Chest Shop")
            .setDescription("This is the Keymaker's shop. You can buy items here.\nYou can buy items by using `/buy <item name>`")
            .setColor(data.style.colors.red)

        const allChests = await getAllChests();

        allChests.forEach(async (chest) => {
            console.log(chest);
            const items = await getItemsByChestId('1');
            console.log(items);
            var itemstring = "";
            items.forEach(async (item) => {
                itemstring += `• ${item.name} - ${item.probability}  ${item.type} \n`;
            });
            shopEmbed.addField(chest.name, `${chest.description}\n\n${itemstring}`, true);
        })

        // shopEmbed.addFields(
        //     { name: "Chest (200 Red Pills)", value: "• Invite - 15%\n• Whitelist - 50%", inline: true },
        //     { name: "Chest (500 Red Pills)", value: "• Invite - 25%\n• Whitelist - 75%", inline: true },
        // )

        await interaction.reply({ embeds: [shopEmbed] })
    }
}