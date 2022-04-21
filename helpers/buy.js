const client = require("../index.js");
const data = require(`${process.cwd()}/properties.json`)
const { getChestByName } = require("../helpers/dbChests.js");
const { getItemsByChestId } = require("./dbItems.js");
const { addMoneyToUser } = require("./dbMoney.js");

exports.getItemOnProbability = async (items) => {
    var percent
    var result, acc
    while (result === null || result === undefined) {

        const rnd = Math.random() * 100000;
        percent = rnd / 1000;
        result = null, acc = 0;

        for (const item of items) {
            if (result === null && percent >= 100 - item.probability - acc) {
                console.log(item.probability, item.id);
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
            user.roles.add(role)
            break;
        case "ETH":

            break;
        case "INVITE":
            
            break;
        default:
            return null;
    }
}

exports.sendCheckoutMessage = async (item, user) => {
    const checkoutChannel = client.channels.fetch(data.channels.checkout)

    var checkoutEmbed = new MessageEmbed()
        .setTitle(`New Item bought!`)
        .setDescription(`${user} bought ${item}`)
        .setColor(data.style.colors.red)
        .setTimestamp()

    checkoutChannel.send({ embeds: [checkoutEmbed] })

}

exports.buyItem = async (item, user) => {
    const chest = await getChestByName(item)
    if (chest === undefined || chest === []) {
        return `⛔ - This chest does not exist!\nYou used **${item}**`
    }
    if (chest.isBuyable == 0) {
        return `⛔ - This chest is not buyable!\nYou used **${item}**`
    }
    const items = await getItemsByChestId(chest.id)
    if (items === undefined || items === []) {
        return `⛔ - This chest does not have any items!\nYou used **${item}**`
    }
    const chestItem = await this.getItemOnProbability(items)

    this.redeemItem(chestItem, user)

    return "You bought " + chestItem.amount + " " + chestItem.name + "!"
}

