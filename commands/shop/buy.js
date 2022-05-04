const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const { buyItem } = require("../../helpers/buy")
const { getChestByName } = require("../../helpers/dbChests")
const { getItemsByChestId } = require("../../helpers/dbItems")
const logger = require("../../handlers/logger")
const { hasEnoughMoney } = require("../../helpers/dbMoney")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "buy",
    description: "Buy a item from the shop.",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "item",
            description: "The item you want to buy.",
            type: "STRING",
            required: true,
        }
    ],


    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        try {
            await interaction.deferReply({ ephemeral: true })
            const item = args[0]
            const chest = await getChestByName(item)
            if (chest === undefined || chest === []) {
                interaction.followUp({ content: `⛔ - This chest does not exist!\nYou used **${item}**`})
                return
            }
            if (chest.isBuyable == 0) {
                interaction.followUp({ content: `⛔ - This chest is not buyable!\nYou used **${item}**` })
                return
            }
            if (await hasEnoughMoney(interaction.user.id, { redpills: 0, bluepills: chest.bluepills })) {
                interaction.followUp({ content: `⛔ - You don't have enough money!\nYou need **${chest.bluepills}** blue Pill/s` })
                return
            }
            const items = await getItemsByChestId(chest.id)
            if (items === undefined || items === []) {
                interaction.followUp({ content: `⛔ - This chest does not have any items!\nYou used **${item}**` })
                return
            }
            const result = await buyItem(item, interaction.user)
            if (result == undefined) {
                return interaction.followUp({ content: `⛔ - Something went wrong while buying the item` })
            }
            await interaction.followUp({ files: [`./assets/chests/${result}.gif`], ephemeral: true })
        } catch (err) {
            await interaction.followUp({ content: "Something went wrong while buying the item.", ephemeral: true })
            logger.error(err)
        }
    }
}