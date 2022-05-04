const { MessageEmbed } = require("discord.js")
const client = require("../index.js");
const data = require(`${process.cwd()}/properties.json`)
const { getChestByName } = require("../helpers/dbChests.js");
const { getItemsByChestId } = require("./dbItems.js");
const { addMoneyToUser, removeMoneyFromUser } = require("./dbMoney.js");
const logger = require("../handlers/logger.js");

exports.getItemOnProbability = async (items) => {
    var percent
    var result, acc
    while (result === null || result === undefined) {

        const rnd = Math.random() * 100000;
        percent = rnd / 1000;
        result = null, acc = 0;

        for (const item of items) {
            if (result === null && percent >= 100 - item.probability - acc) {
                result = item;
                acc += parseFloat(item.probability)
            }
        }
        // console.log(result);
    }
    // console.log(percent + "% " + result);
    return result;
}

exports.redeemItem = async (item, user) => {
    switch (item.type) {
        case "REDPILL":
            await addMoneyToUser(user.id, { redpill: item.amount, bluepill: 0 })
            break;
        case "BLUEPILL":
            await addMoneyToUser(user.id, { redpill: 0, bluepill: item.amount })
            break;
        case "ROLE":
            const role = client.guilds.cache.get(data.guildId).roles.cache.find(role => role.id === item.value)
            const member = await client.guilds.cache.get(data.guildId).members.fetch(user.id)
            member.roles.add(role)
            break;
        case "ETH":

            break;
        case "INVITE":
            const guild = client.guilds.cache.get(data.guildId)
            const channel = guild.channels.cache.find(channel => channel.id === data.channels.invite)
            const invite = await channel.createInvite({ maxAge: 0, maxUses: 1 })
            await user.send(invite.url)
            break;
        default:
        // return null;
    }
}

exports.sendCheckoutMessage = async (item, chest, user) => {
    const checkoutChannel = await client.channels.fetch(data.channels.checkout)

    var checkoutEmbed = new MessageEmbed()
        .setTitle(`${user.username} bought a ${chest.name}`)
        .setDescription(`<@${user.id}> got ${item.amount} ${item.name}(s)`)
        .setColor(data.style.colors.red)
        .setTimestamp()
    await checkoutChannel.send({ embeds: [checkoutEmbed] })
}

exports.buyItem = async (item, user) => {
    const chest = await getChestByName(item)
    const chestItem = await this.getItemOnProbability(await getItemsByChestId(chest.id))

    await this.sendCheckoutMessage(chestItem, chest, user)
    try {
    await this.redeemItem(chestItem, user)
    await removeMoneyFromUser(user.id, { redpill: 0, bluepill: chest.bluepills })
    return chestItem.gif
    } catch (err) {
        console.log("Couldn't send message");
        return undefined;
    }
}

