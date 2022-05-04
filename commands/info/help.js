const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const logger = require("../../handlers/logger")
const data = require(`${process.cwd()}/properties.json`)

module.exports = {
    name: "help",
    description: "Get help for the diffrent commands and about the bot.",
    type: 'CHAT_INPUT',

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        try {
            let helpEmbed = new MessageEmbed()
                .setTitle(` für den ${client.user.tag} -- Help`)
                .setDescription(`JUST THE BOT DESCRIPTION`)
                .setColor(data.style.colors.red)
                .setTimestamp()
                .setFooter({ text: "By Fynnyx | github.com/Fynnyx" })

            client.slashCommands.map(value => {
                helpEmbed.addField(value.name, value.description, true)
            })

            await interaction.reply({ embeds: [helpEmbed] })
        } catch (error) {
            logger.error(error)
        }
    }
}