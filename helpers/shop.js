const { MessageEmbed } = require("discord.js");
const { writeFileSync } = require("fs");
const client = require("../index")
const data = require(`../properties.json`)
const variables = require("../variables.json")

exports.openShop = async () => {
    variables.isShopOpen = true;
    writeFileSync(`${process.cwd()}/variables.json`, JSON.stringify(variables, null, 2));
    const openShopEmbed = new MessageEmbed()
        .setTitle("Let the harvest begin!")
        .setDescription(`You have ${data.shop.durationMin} Minutes until it ends!`)
        .setColor(data.style.colors.red)
        .setThumbnail(client.user.avatarURL)
        .setTimestamp()
        const shopinfoChannel = client.channels.cache.get(data.channels.notifications)
        await shopinfoChannel.bulkDelete(100)
        await shopinfoChannel.send({ content: "@everyone", embeds: [openShopEmbed] })
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