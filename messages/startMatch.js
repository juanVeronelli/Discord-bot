
const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const stream = require("../music/play");

const messagesToStartMatch = async (team1, team2, message) => {
    return new Promise((resolve, reject) => {
        try {
            // send first messages in the match
            message.channel.send(`Muy buenas noches para todo el Discord, aca estamos en el Estadio de ${team1.teamInfo.name} para vivir, sentir y disfrutar de este hermoso partido de liga ente ${team1.teamInfo.name} y ${team2.teamInfo.name}, me acompaña como siempre mi gran amigo, Ariel senosiain`);
            setTimeout(() => { message.channel.send(`Que tal Rodo, partidazo en la apis league, dos equipos que estan fuertes que quieren ganar y unas ganas tremendas de ver los planteamientos tacticos de ambos tecnicos para ver quien le gana esa pulseada a quien Rodo`) }, 5000) // wait 5000MS to send next message
            setTimeout(async () => {
                message.channel.send(`Claro que si ariel pero esperame un segundito que ya entran los equipos al terreno de juego, suena la musica, esto es ${team1.teamInfo.name} vs ${team2.teamInfo.name}`);
                await stream.walkout(message) // walkout sound
            }, 10000);
            setTimeout(() => {
                let goalKeeper = team1.players.filter((player) => { return player.stats.stats.pos === "arquero" }) // get goalkeeper from players Array
                let defenders = team1.players.filter((player) => { return player.stats.stats.pos === "defensor" }) // get denders
                let midfielder = team1.players.filter((player) => { return player.stats.stats.pos === "mediocampista" }) // get midfielder
                let forward = team1.players.filter((player) => { return player.stats.stats.pos === "delantero" }) // get forwards

                const embed = new EmbedBuilder()
                    .setAuthor({ name: "Api Analityc", iconURL: "https://pbs.twimg.com/media/FvRKPkIX0AA-mSc?format=png&name=small" })
                    .setTitle(`Asi forma el equipo local, estos son los 7 de ${team1.teamInfo.name}`)
                    .addFields({ name: "Arquero", value: goalKeeper[0].stats["stats"].nombre })
                    .setThumbnail(team1.teamInfo.logotype)
                    .setColor("DarkGold")
                if (defenders.length > 0) {
                    embed.addFields({ name: "Defensores", value: '\u200a' })
                    for (let i in defenders) { // if exist any defender
                        embed.addFields({ name: "\u200a", value: defenders[i].stats["stats"].nombre })
                    }
                }
                if (midfielder.length > 0)
                    embed.addFields({ name: "Mediocampistas", value: '\u200a' })
                for (let i in midfielder) { // if exist any midfielder
                    embed.addFields({ name: "\u200a", value: midfielder[i].stats["stats"].nombre })
                }
                if (forward.length > 0) { // if exist any forward
                    embed.addFields({ name: "Delanteros", value: '\u200a' })
                    for (let i in forward) {
                        embed.addFields({ name: "\u200a", value: forward[i].stats["stats"].nombre })
                    }
                }
                message.channel.send({ embeds: [embed] })
            }, 30000) // Send formation team1
            setTimeout(() => {
                let goalKeeper = team2.players.filter((player) => { return player.stats.stats.pos === "arquero" }) // get goalkeeper from players Array
                let defenders = team2.players.filter((player) => { return player.stats.stats.pos === "defensor" }) // get denders
                let midfielder = team2.players.filter((player) => { return player.stats.stats.pos === "mediocampista" }) // get midfielder
                let forward = team2.players.filter((player) => { return player.stats.stats.pos === "delantero" }) // get forwards

                const embed = new EmbedBuilder()
                    .setAuthor({ name: "Api Analityc", })
                    .setTitle(`Asi forma el equipo visitante, estos son los 7 de ${team2.teamInfo.name}`)
                    .addFields({ name: "Arquero", value: goalKeeper[0].stats["stats"].nombre })
                    .setThumbnail(team2.teamInfo.logotype)
                    .setColor("DarkGold")
                if (defenders.length > 0) {
                    embed.addFields({ name: "Defensores", value: '\u200a' })
                    for (let i in defenders) { // if exist any defender
                        embed.addFields({ name: "\u200a", value: defenders[i].stats["stats"].nombre })
                    }
                }
                if (midfielder.length > 0)
                    embed.addFields({ name: "Mediocampistas", value: '\u200a' })
                for (let i in midfielder) { // if exist any midfielder
                    embed.addFields({ name: "\u200a", value: midfielder[i].stats["stats"].nombre })
                }
                if (forward.length > 0) { // if exist any forward
                    embed.addFields({ name: "Delanteros", value: '\u200a' })
                    for (let i in forward) {
                        embed.addFields({ name: "\u200a", value: forward[i].stats["stats"].nombre })
                    }
                }
                message.channel.send({ embeds: [embed] })
            }, 45000) // send formation team2
            setTimeout(() => {
                // message.channel.send("Que partido no espera Arielll, silba Herrera, los primeros 45 minutos aqui en vistalas studios TV")
                const embed = new EmbedBuilder()
                    .setAuthor({ name: "Apis League", iconURL: "https://pbs.twimg.com/media/FvRKPkIX0AA-mSc?format=png&name=small" })
                    .setColor("DarkGold")
                    .setTitle(`${team1.teamInfo.name} - ${team2.teamInfo.name}`)
                    .addFields({ name: `Formacion de ${team1.teamInfo.name}`, value: `${team1.teamInfo.formation}` })
                    .addFields({ name: `Estilo de ${team1.teamInfo.name}`, value: `${team1.teamInfo.style}` })
                    .addFields({ name: `Formacion de ${team2.teamInfo.name}`, value: `${team2.teamInfo.formation}` })
                    .addFields({ name: `Estilo de ${team2.teamInfo.name}`, value: `${team2.teamInfo.style}` })
                message.channel.send({
                    embeds: [embed],
                    components: [
                        new ActionRowBuilder().setComponents(
                            new ButtonBuilder()
                                .setStyle(ButtonStyle.Success)
                                .setCustomId("team1")
                                .setLabel(`Gana ${team1.teamInfo.name}`),
                            new ButtonBuilder()
                                .setStyle(ButtonStyle.Success)
                                .setCustomId("team2")
                                .setLabel(`Gana ${team2.teamInfo.name}`),
                            new ButtonBuilder()
                                .setStyle(ButtonStyle.Success)
                                .setCustomId("draw")
                                .setLabel(`Empate`)
                        )
                    ]
                })
                resolve();
            }, 70000)
        } catch (err) {
            console.log(err)
            reject()
        }
    });
}

module.exports = {
    messagesToStartMatch
}