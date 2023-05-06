const store = require('../storage/store');
const players = require('../players')

const { EmbedBuilder } = require('discord.js');

const listAllPlayers = async (command, message) => {
    try {

        const page = message.content.slice(command.length).trim().split(/ +/g)[1]
        if (!page) return message.channel.send("actualmente hay 2 ojas de jugadores, ***'!list 1'***  o ***'!list 2'***")
        const playersInfo = await store.listAllPlayers();
        const embed = new EmbedBuilder()
            .setColor('DarkGold')
            .setTitle('***Jugadores***')
            .setAuthor({ name: "Ojeador del presidente " + message.author.username })
            .setDescription("hola! aca te dejo mi informe sobre los jugadores transferibles para este mercado de fichajes, recuerde que solo contramos con 25 Millones para firmar 7 jugadores")
            .setFooter({ text: "si quieres que siga mas de cerca a un jugador dimelo con !scout id" })

        var count = 0

        if (page == 1) {
            playersInfo.forEach(player => {
                if (count <= 17) {
                    count += 1
                    embed.addFields({ name: + player.id + ': ' + player.stats["stats"].nombre, value: player.stats["stats"].precio + ` Millones `, inline: true })
                }
            })

            embed.addFields({ name: "\u200a", value: "\u200a" })
            embed.addFields({ name: "siguiente hoja", value: "!list 2" })
            return message.channel.send({ embeds: [embed] });

        } else if (page == 2) {
            playersInfo.forEach(player => {
                if (count >= 17 && count <= 28) {
                    count += 1
                    embed.addFields({ name: + player.id + ':' + player.stats["stats"].nombre, value: player.stats["stats"].precio + ` Millones `, inline: true })
                } else {
                    count += 1
                }
            })

            embed.addFields({ name: "\u200a", value: "\u200a" })
            embed.addFields({ name: "hoja anterior", value: "!list 1" })
            return message.channel.send({ embeds: [embed] });

        } else if (page == 3) {
            playersInfo.forEach(player => {
                if (count >= 28) {
                    count += 1
                    embed.addFields({ name: + player.id + ':' + player.stats["stats"].nombre, value: player.stats["stats"].precio + ` Millones `, inline: true })
                } else {
                    count += 1
                }
            })

            embed.addFields({ name: "\u200a", value: "\u200a" })
            embed.addFields({ name: "hoja anterior", value: "!list 1" })
            return message.channel.send({ embeds: [embed] });
        }

        return message.channel.send("actualmente hay 2 ojas de jugadores, ***'!list 1'***  o ***'!list 2'***");
    } catch (e) {
        console.log(e)
    }
}

const addPlayers = async () => {
    await store.addPlayers(players.jugadores)
}

const listOnePlayer = async (command, message) => {
    try {

        const playerId = message.content.slice(command.length).trim().split(/ +/g)[1]
        if (!playerId) return message.channel.send('no hay ningun id en tu peticion')

        const response = await store.listOnePlayer(playerId);
        if (response[0].stats["stats"].pos == "arquero") {

            const embed2 = new EmbedBuilder()
            embed2.setColor('DarkGold')
            embed2.setTitle(response[0].stats["stats"].nombre)
            embed2.setDescription("he realizado un seguimiento y esta es toda la informacion que tengo");
            embed2.addFields({ name: "PRECIO", value: `${response[0].stats["stats"].precio} Millones de dolares` });
            embed2.addFields({ name: "POSICION", value: `${response[0].stats["stats"].pos}` });
            embed2.addFields({ name: "ATAJADA", value: `${response[0].stats["stats"].attr.atajada}` });
            embed2.addFields({ name: "RITMO", value: `${response[0].stats["stats"].attr.ritmo}` });
            embed2.addFields({ name: "POSICION", value: `${response[0].stats["stats"].attr.posicion}` });
            embed2.addFields({ name: "VERSUS", value: `${response[0].stats["stats"].attr.versus}` });
            embed2.addFields({ name: "PASE", value: `${response[0].stats["stats"].attr.pase}` });
            return message.channel.send({ embeds: [embed2] })

        }

        const embed2 = new EmbedBuilder()
        embed2.setColor('DarkGold')
        embed2.setTitle(response[0].stats["stats"].nombre)
        embed2.setDescription("he realizado un seguimiento y esta es toda la informacion que tengo");
        embed2.addFields({ name: "PRECIO", value: `${response[0].stats["stats"].precio} Millones de dolares` });
        embed2.addFields({ name: "POSICION", value: `${response[0].stats["stats"].pos}` });
        embed2.addFields({ name: "REMATE", value: `${response[0].stats["stats"].attr.remate}` });
        embed2.addFields({ name: "RITMO", value: `${response[0].stats["stats"].attr.ritmo}` });
        embed2.addFields({ name: "REGATE", value: `${response[0].stats["stats"].attr.regate}` });
        embed2.addFields({ name: "DEFENSA", value: `${response[0].stats["stats"].attr.defensa}` });
        embed2.addFields({ name: "PASE", value: `${response[0].stats["stats"].attr.pase}` });
        return message.channel.send({ embeds: [embed2] })

    } catch (e) {
        console.log(e)
        message.channel.send("no existe ese jugador");
        return
    }
}

const buyOnePLayer = async (command, message) => {
    const playerId = message.content.slice(command.length).trim().split(/ +/g)[1]
    if (!playerId) return message.channel.send('no hay ningun id en tu peticion');

    return await store.buyOnePlayer(playerId, message.author.id, message);
}

module.exports = {
    listAllPlayers,
    listOnePlayer,
    addPlayers,
    buyOnePLayer
}