const store = require("../storage/store")

const { ButtonBuilder, EmbedBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const actions = require('./actions')
const startMessage = require('../messages/startMatch')
const indexPerfection = require('../src/styleperfection')
const messageInMatch = require('../src/messagePerTactic')

const startMatch = async (team1, team2, message) => {
    const match = await store.createMacth(team1.teamInfo.president, team2.teamInfo.president) // Create match
    // Init the match 
    await startMessage.messagesToStartMatch(team1, team2, message) // send first messages 
        .then(() => {
            setTimeout(() => {
                firstHalf(team1, team2, message, match) // init first half
            }, 10000)
        })
}


const firstHalf = async (team1, team2, message, match) => {
    // set count and minute to 0
    let minute = 0;
    message.channel.send("`-----Comienzo del partido-----`") // send message to channel

    let interval = setInterval(async () => {
        // set indexs styles
        let index1 = await indexPerfection.styleIndex(team1.teamInfo.president, team2.teamInfo.president) || 80
        let index2 = await indexPerfection.styleIndex(team2.teamInfo.president, team1.teamInfo.president) || 80
        // +1 minute
        minute = minute + 1
        // set random number
        let rnNumberTeam1 = Math.floor(Math.random() * 120) // local team get little perk
        let rnNumberTeam2 = Math.floor(Math.random() * 100)
        // goals 
        if (rnNumberTeam1 > index1) return await actions.goal(team1, minute, match, message) // goal team 1
        if (rnNumberTeam2 > index2) return await actions.goal(team2, minute, match, message) // goal team 2
        // if neither team scores a goal
        if (rnNumberTeam2 < 20) return await messageInMatch.tacticMessage(team1, message, minute) // send random message in match
        if (rnNumberTeam2 > 80) return await messageInMatch.tacticMessage(team2, message, minute) // send random message in match

        message.channel.send(`***Minuto ${minute} ***`)

        let additional = Math.floor(Math.random() * 10)
        if (minute === (minute + additional)) {
            message.channel.send("`-----Final de la primera mitad-----`");
            return clearInterval(interval)
        }
    }, 5000)
}

const secondHalf = async (team1, team2, message, match) => {
    // set count and minute to 45
    let count = 45
    let minute = 45;

    // get index styles
    let index1 = await indexPerfection.styleIndex(team1.teamInfo.president, team2.teamInfo.president)
    let index2 = await indexPerfection.styleIndex(team2.teamInfo.president, team1.teamInfo.president)

    // get scores to DB
    const scoreResponse = await store.getScore(match)

    let team1Score = scoreResponse.scoreTeam1 || 0
    let team2Score = scoreResponse.scoreTeam2 || 0

    message.channel.send("`COMIENZO DE LA SEGUNDA MITAD Resultado parcial:`" + team1Score + " - " + team2Score)

    let interval = setInterval(async () => {
        await store.updateMatch(team1Score, team2Score, match);

        count = count + 1

        let team1Rn = Math.floor(Math.random() * 110);
        let team2Rn = Math.floor(Math.random() * 110);

        let newMinute = minute + 1

        minute = newMinute;


        if (team1Rn > index1) {
            let opportunity = Math.floor(Math.random() * 130);

            if (opportunity > 0 && opportunity <= 10) team1Score = await actions.goalTeam1(team1, team2, message, team1Score, team2Score, newMinute, match)
            if (opportunity > 10 && opportunity <= 40) team1Score = await actions.freekickTeam1(team1, team2, message, team1Score, team2Score, newMinute, match)
            if (opportunity > 40 && opportunity <= 80) return await messages.tacticMessage(team1, team1.teamInfo.president, message, newMinute)
            if (opportunity > 80 && opportunity <= 82) team1Score = await actions.penaltyTeam1(team1, team2, message, team1Score, team2Score, newMinute, match)
            if (opportunity > 82 && opportunity <= 130) team1Score = await actions.cornerTeam1(team1, team2, message, team1Score, team2Score, newMinute, match)
        }
        else if (team2Rn > index2) {
            let opportunity = Math.floor(Math.random() * 130);

            if (opportunity > 0 && opportunity <= 10) team2Score = await actions.goalTeam2(team1, team2, message, team1Score, team2Score, newMinute, match)
            if (opportunity > 10 && opportunity <= 40) team2Score = await actions.freekickTeam2(team1, team2, message, team1Score, team2Score, newMinute, match)
            if (opportunity > 40 && opportunity <= 80) return await messages.tacticMessage(team2, team2.teamInfo.president, message, newMinute)
            if (opportunity > 80 && opportunity <= 82) team2Score = await actions.penaltyTeam2(team1, team2, message, team1Score, team2Score, newMinute, match)
            if (opportunity > 82 && opportunity <= 130) team2Score = await actions.cornerTeam2(team1, team2, message, team1Score, team2Score, newMinute, match)
        } else {
            message.channel.send(`***Minuto ${newMinute}***`)
        }

        if (count == 94) {
            message.channel.send(`***Termina el partido!! resultado: ${team1.teamInfo.name}: ${team1Score} - ${team2.teamInfo.name}: ${team2Score}***`)
            clearInterval(interval)


            // await store.addMatch(team1.teamInfo.president, match)
            // await store.addMatch(team2.teamInfo.president, match)

            // send end message 
            const scorers = await store.getScorers(match)

            const embed = new EmbedBuilder()
                .setAuthor({ name: "apis league" })
                .setColor("DarkGold")
                .addFields({ name: "con Goles de", value: `\u200a` })
            for (let i = 0; i <= scorers.length - 1; i++) {
                embed.addFields({ name: `${scorers[i]}`, value: `\u200a` })
            }
            if (team1Score > team2Score) {
                embed.setTitle(`GANOOO ${team1.teamInfo.name}`)
                embed.setDescription(`Con un resultado final de ${team1Score} a ${team2Score}, da por terminado el partido el arbitro. ${team1.teamInfo.name} y una excepcional presentacion en la Apis Legaue le gana a ${team2.teamInfo.name} con un estilo bien marcado, suma 3 puntos y trepa posiciones!`)
                await store.setPoints(team1.teamInfo.president, 3)
            } else if (team2Score > team1Score) {
                embed.setTitle(`GANOOO ${team2.teamInfo.name}`)
                embed.setDescription(`Con un resultado final de ${team1Score} a ${team2Score}, da por terminado el partido el arbitro. ${team2.teamInfo.name} y una excepcional presentacion en la Apis Legaue le gana a ${team1.teamInfo.name} con un estilo bien marcado, suma 3 puntos y trepa posiciones!`)
                await store.setPoints(team2.teamInfo.president, 3)
            } else {
                embed.setTitle(`Empate en api stadium`)
                embed.setDescription(`Con un resultado final de ${team1Score} a ${team2Score}, se termina el partido, ${team1.teamInfo.name} y ${team2.teamInfo.name} no se pudieron lastimar de mas y ambos se lleva el +1`)
                await store.setPoints(team1.teamInfo.president, 1)
                await store.setPoints(team2.teamInfo.president, 1)
            }

            message.channel.send({ embeds: [embed] })


        }

    }, 5000)

}




module.exports = {
    startMatch
}