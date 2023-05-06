const store = require('../storage/store');
const players = require('../players')

const { EmbedBuilder } = require('discord.js');


const create = async (command, message) => {
    const teamName = message.content.slice(command.length).trim().split(/ +/g)[1]
    if (!teamName) return message.channel.send('Please provide a team name.')
    if ((await store.teamFounder(message.author.id)).lenght >= 1) return message.channel.send(`ya tienes como equipo a ***${(await store.teamFounder(message.author.id)).query[0].name}***`);
    const create = await store.createTeam(teamName, message.author.id)
    if (!create) return message.channel.send("no se ha podido crear el equipo")
    message.channel.send(`***El presidente ${message.author.username} ha creado el equipo ${teamName} con exito! ***`)
}



const viewOwnTeam = async (command, message) => {
    const response = await store.view(message.author.id);
    const embed = new EmbedBuilder()
        .setTitle(`club :  ***${response.name}***`)
        .addFields({ name: "JUGADORES", value: '\u200a' })
        .setColor("DarkGold")
        .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
    for (let i in response.players) {
        embed.addFields({ name: `${response.players[i]}`, value: '\u200a', inline: true })
    }
    embed.addFields({ name: "Plata restante", value: `${response.money}` })

    return message.channel.send({ embeds: [embed] })
}


module.exports = {
    create,
    viewOwnTeam
}