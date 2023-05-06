const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const setFormation = async (command, message) => {
    const embed = new EmbedBuilder()
        .setAuthor({ name: "La Api league" })
        .setColor("DarkGold")
        .setTitle("FORMACIONES")
        .addFields({ name: "3-2-1", value: "\u200a", inline: true })
        .addFields({ name: "4-1-1", value: "\u200a", inline: true })
        .addFields({ name: "2-3-1", value: "\u200a", inline: true })
        .addFields({ name: "2-2-2", value: "\u200a", inline: true })
        .addFields({ name: "3-1-2", value: "\u200a", inline: true })


    message.channel.send("***tu equipo podra elegir ente 5 formaciones distintas, ¿cual te conviene mas? revisa la documentacion para saber cual se adapta mejor a tu manera de jugar y tus jugadores o atrevete a averiguarlo por tu cuenta por prueba y error***")
    message.channel.send({
        embeds: [embed],
        components: [
            new ActionRowBuilder().setComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
                    .setLabel("3-2-1")
                    .setCustomId('3-2-1'),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
                    .setLabel("4-1-1")
                    .setCustomId('4-1-1'),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
                    .setLabel("2-3-1")
                    .setCustomId('2-3-1'),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
                    .setLabel("2-2-2")
                    .setCustomId('2-2-2'),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
                    .setLabel("3-1-2")
                    .setCustomId('3-1-2')
            )
        ]
    })
}

const setStyle = async (command, message) => {
    const embed = new EmbedBuilder()
        .setAuthor({ name: "La Api league" })
        .setColor("DarkGold")
        .setTitle("ESTILOS")
        .addFields({ name: "posesion", value: "\u200a", inline: true })
        .addFields({ name: "contragolpe", value: "\u200a", inline: true })
        .addFields({ name: "catenaccio", value: "\u200a", inline: true })
        .addFields({ name: "tikitaka", value: "\u200a", inline: true })
        .addFields({ name: "equilibrado", value: "\u200a", inline: true })

    message.channel.send({
        embeds: [embed],
        components: [
            new ActionRowBuilder().setComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
                    .setLabel("Posesion")
                    .setCustomId("posesion"),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
                    .setLabel("Contragolpe")
                    .setCustomId("contragolpe"),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
                    .setLabel("Catenaccio")
                    .setCustomId("catenaccio"),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
                    .setLabel("Tikitaka")
                    .setCustomId("tikitaka"),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
                    .setLabel("Equilibrado")
                    .setCustomId("equilibrado")
            )
        ],
        ephemeral: true
    })
}

module.exports = {
    setFormation,
    setStyle
}