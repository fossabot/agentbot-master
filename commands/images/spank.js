const Canvacord = require('canvacord');
const canva = new Canvacord.Canvas();
const {MessageAttachment} = require('discord.js')
module.exports = {
    name: "spank",
    category: "images",
    description: "Vỗ mông :))",
    usage: "spank [@tag]",
    VD: "spank @phamleduy04",
    run: async (client, message, args) => {
        let url1 = message.author.avatarURL({format: 'png', dynamic: false})
        let nguoitag = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        let avaurl = nguoitag.user.avatarURL({format: 'png', dynamic: false})
        let image = await canva.spank(url1,avaurl)
        let attach = new MessageAttachment(image, 'spank.png')
        return message.channel.send(attach)
    }
}

module.exports.limits = {
    rateLimit: 1,
    cooldown: 100
}