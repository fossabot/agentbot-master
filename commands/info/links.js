const { MessageEmbed } = require('discord.js');
const cmtag = require('common-tags');
module.exports = {
    name: "links",
    aliases: ["link", "invite"],
    category: "info",
    description: "Links ",
    usage: "links",
    run: (client, message, args) => {
        const embed = new MessageEmbed()
            .setAuthor('Owner bot: phamleduy04#9999')
            .setTitle('Các link của AgentBot!')
            .setColor('RANDOM')
            .setDescription(cmtag.stripIndent `[Add AgentBot vào server:](https://discordapp.com/api/oauth2/authorize?client_id=645883401500622848&permissions=8&scope=bot)
        
        [Support server:](https://discord.gg/sn3nBCJ)

        Top.gg link: (update sau)

        [Github:](https://github.com/phamleduy04/agentbot-master) 
        `)
        message.channel.send(embed)
    }
}