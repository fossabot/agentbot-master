const ss = require('string-similarity');
const db = require('quick.db');
module.exports = {
    name: "setlogchannel",
    category: "settings",
    description: "Set log channel for kick and ban",
    usage: "setlogchannel <#channel, tên channel hoặc id>",
    example: "setlogchannel #log-channel",
    run: async(client, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply('Bạn cần có quyền MANAGE_GUILD để chạy lệnh này.')
        if (!args[0]) return message.channel.send("Vui lòng nhập channel!")
        let id = args[0]
        if (id.startsWith("<#")) id = id.slice(2, id.length -1)
        let channel = message.guild.channels.cache.get(id)
        if (isNaN(id)){
            let list_channel =  message.guild.channels.cache.filter(c => c.type == 'text').map(channel => channel.name)
            let channel_name = args.join(' ')
            let matches = ss.findBestMatch(channel_name, list_channel)
            if (matches.bestMatch.rating < 0.6) return message.channel.send(`Không tìm thấy channel tên ${channel_name}`)
            channel = message.guild.channels.cache.find(channel => channel.name == matches.bestMatch.target)
        }
        if (!channel) return message.channel.send('Không tìm thấy channel!')
        //log to database
        await db.set(`${message.guild.id}.logchannel`, channel.id)
        message.channel.send(`Đã lưu ${channel} vào log channel!`)
    }
}