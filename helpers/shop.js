const { MessageEmbed } = require("discord.js");
const { writeFileSync } = require("fs");
const client = require("../index")
const data = require(`../properties.json`)
const variables = require("../variables.json")

exports.openShop = async () => {
    variables.isShopOpen = true;
    const openShopEmbed = new MessageEmbed()
        .setTitle("Shop is now open!")
        .setDescription(`You have ${data.shop.durationMin} Minutes`)
        .setColor(data.style.colors.red)
        .setThumbnail(client.user.avatarURL)
        .setTimestamp()
    
        client.channels.cache.get(data.channels.notifications).send({ content: "@everyone", embeds: [openShopEmbed] })
}

exports.closeShop = async () => {
    variables.isShopOpen = false;
    writeFileSync(`${process.cwd()}/variables.json`, JSON.stringify(variables, null, 2));
    const closeShopEmbed = new MessageEmbed()
        .setTitle("Shop is now closed!")
        .setColor(data.style.colors.red)
        .setTimestamp()
    
        client.channels.cache.get(data.channels.notifications).send({ content: "@everyone", embeds: [closeShopEmbed] })
}