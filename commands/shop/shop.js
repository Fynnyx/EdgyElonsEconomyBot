const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const { getAllChests } = require("../../helpers/dbChests")
const { getItemsByChestId } = require("../../helpers/dbItems")
const logger = require("../../handlers/logger")
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
        try {
            const shopEmbed = new MessageEmbed()
                .setTitle("Keymaker`s - Chest Shop")
                .setDescription("I offer only the finest products but I only take Red Pills!\n\nThis is the Keymaker's shop. You can buy items here.\nYou can buy items by using `/buy <item name>`")
                .setColor(data.style.colors.red)

            const allChests = await getAllChests();
            for (var chest of allChests) {
                const items = await getItemsByChestId(chest.id);
                var itemstring = "";
                for (var item of items) {
                    itemstring += `• ${item.name} - ${item.probability}%\n`;
                }
                shopEmbed.addFields({ name: `${chest.name} - ${chest.bluepills} BPs`, value: `${chest.description}\n\n${itemstring}`, inline: true });
            }
            await interaction.reply({ embeds: [shopEmbed] })
        } catch (error) {
            logger.error(error)
            interaction.reply({ content: "An error occured!", ephemeral: true })
        }
    }
}