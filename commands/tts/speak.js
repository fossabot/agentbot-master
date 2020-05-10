const tts =  require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const ttsclient = new tts.TextToSpeechClient();
const lang_list = {
    "en": "en-US",
    "vi": "vi-VN"
}
const db = require('quick.db');
module.exports = {
    name: 'speak',
    aliases: ['say', 's'],
    category: 'tts',
    description: 'talk',
    usage: 'speak [lang] <text>',
    note: 'lang = en hoặc vi',
    VD: 'speak en hello world',
    run: async(client, message, args) => {
        if (db.get(`${message.guild.id}.botdangnoi`) === true) return message.channel.send('Có người khác đang xài lệnh rồi, vui lòng thử lại sau D:.')
        if (!args[0]) return message.channel.send('Vui lòng nhập gì đó :D.');
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('Bạn phải vào voice channel để có thể sử dụng lệnh này.');
        const botpermission = voiceChannel.permissionsFor(client.user);
        if (!botpermission.has('CONNECT')) return message.channel.send('Bot không có quyền vào channel của bạn!');
        if (!botpermission.has('SPEAK')) return message.channel.send('Bot không có quyền nói trong channel của bạn!');
        await db.set(`${message.guild.id}.botdangnoi`, true)
        let text = args.join(' ')
        let lang = await db.get(`${message.guild.id}.defaulttts`)
        if (!lang || lang === null) lang = 'vi-VN'
        if (lang_list[args[0]]) {
            text = args.slice(1).join(' ')
            lang = lang_list[args[0]]
        }
        //create request
        const request = {
            input: {text: text},
            voice: {languageCode: lang, ssmlGender: 'FEMALE'},
            audioConfig: {audioEncoding: 'MP3'},
        };

        const [response] = await ttsclient.synthesizeSpeech(request);
        const writeFile = util.promisify(fs.writeFile);
        await writeFile(`./data/ttsdata/${message.guild.id}.mp3`, response.audioContent, 'binary');
        //sau khi sử lý xong âm thanh, phát cho người dùng
        voiceChannel.join().then(connection => {
            let dispatcher = connection.play(`./data/ttsdata/${message.guild.id}.mp3`)
            dispatcher.on('finish', async () => {
                await db.set(`${message.guild.id}.botdangnoi`, false)
            })
        }) 
    }
}