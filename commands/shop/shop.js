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

        // allChests.forEach(async (chest) => {
        //     console.log(chest.id);
        //     const items = await getItemsByChestId(chest.id);
        //     console.log(items);
        //     var itemstring = "";
        //     items.forEach(async (item) => {
        //         console.log("item --------");
        //         itemstring += `• ${item.name} - ${item.probability}\n`;
        //     });
        //     console.log("---------------------\n" + itemstring);
        //     shopEmbed.addFields({ name: chest.name, value: `${chest.description}\n\n${itemstring}`, inline: true });
        // })
        for (var chest of allChests) {
            const items = await getItemsByChestId(chest.id);
            var itemstring = "";
            for (var item of items) {
                itemstring += `• ${item.name} - ${item.probability}%\n`;
            }
            shopEmbed.addFields({ name: chest.name, value: `${chest.description}\n\n${itemstring}`, inline: true });
        }
        await interaction.reply({ embeds: [shopEmbed] })
    }
}