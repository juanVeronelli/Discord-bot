const { Client, ButtonBuilder, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [131071] });

//settings
client.config = require("./config.json");
const db = require("./db");

// prefix the client
const prefix = '!'

//messages 
const sendMessages = require('./messages/buttons')

// music
const stream = require('./music/play')

//constrollers
const teams = require("./network/teams");
const players = require("./network/player");
const tactics = require("./network/tactic");
const matchdays = require("./network/match")



client.once("ready", async (bot) => {
    console.log(`Logged in as ${client.user.username}!`);
    client.user.setActivity({
        name: `API'S LEAGUE'S`,
    })
    await db(client.config.sv)
})

client.on("messageCreate", async (message) => {
    try {
        //handles
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        //commands from teams actions
        if (command === "create") {
            if (message.channel.id === '1099847076017340468') {
                message.member.roles.add("1100158382310166699");
                return teams.create(command, message);
            }
            return message.channel.send('Solo puedes crear el equipo en el chat "register"');
        }
        if (command === "view") return await teams.viewOwnTeam(command, message);


        //commands from players actions
        if (command === "list") await players.listAllPlayers(command, message)
        if (command === "scout") await players.listOnePlayer(command, message);
        if (command === "buy") return await players.buyOnePLayer(command, message)


        //commands to tactics actions
        if (command === "formation") return await sendMessages.setFormation(command, message) // set fomration
        if (command === "style") return await sendMessages.setStyle(command, message) // set style
        //comands to ADMIN ACTIONS
        if (message.author.id == "556212831775883266") {
            if (command === "add") await players.addPlayers(command, message); // add all players to DB
            if (command === "matchday") return matchdays.match(command, message); // init the match using id
        }
        if (command === "play") return stream.run(client, message, command)

    } catch (error) {
        console.log(error);
    }

})

client.on("interactionCreate", async (interaction) => {
    const i = interaction
    if (i.isButton() && ((i.customId == "3-2-1") || (i.customId == "4-1-1") || (i.customId == "2-2-2") || (i.customId == "2-3-1") || (i.customId == "3-1-2"))) return await tactics.setFormation(interaction.customId, interaction.member.id, interaction)
    if (i.isButton() && ((i.customId == "posesion") || (i.customId == "contragolpe") || (i.customId == "catenaccio") || (i.customId == "tikitaka") || (i.customId == "equilibrado"))) return await tactics.setStyle(interaction.customId, interaction.member.id, interaction)

    // APUESTAS
    if (i.isButton() && ((i.customId == "team1") || (i.customId == "team2") || (i.customId == "draw"))) return interaction.reply(`${interaction.member.user} ha hecho su apuesta`)

})

client.login(client.config.token)
