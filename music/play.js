
const play = require("play-dl")
const store = require("../storage/store")
const { EmbedBuilder } = require("discord.js")

const { createAudioPlayer, createAudioResource, StreamType, demuxProbe, joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice')

module.exports = {
    name: "play",
    description: "Reproduce una cancion",
    options: [
        {
            name: "cancion",
            description: "Cancion / Autor y cancion / Autor",
            type: "STRING",
            required: "true",
        },
    ],
    run: async (client, interaction, command) => {
        const song = interaction.content.slice(command.length + 1, interaction.content.length)
        const vc = interaction.member.voice.channel
        if (!vc) return interaction.reply({ content: "Tienes q estar en un chat de voz", ephemeral: true });

        // conexion
        let yt_info = await play.search(song, {
            limit: 1
        })
        const stream = await play.stream(yt_info[0].url, { discordPlayerCompatibility: true })

        const conection = joinVoiceChannel({
            channelId: vc.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        const resource = createAudioResource(stream.stream, {
            inputType: StreamType.Arbitrary
        })

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }
        });

        player.play(resource)
        conection.subscribe(player)

        player.on(AudioPlayerStatus.Idle, () => conection.destroy())

        const embed = new EmbedBuilder()
            .setColor("DarkGold")
            .setTitle(`Reproduciendo: ${yt_info[0].title}`)
            .addFields({ name: "views", value: `***${yt_info[0].views}***`, inline: true })
            .addFields({ name: "author", value: `***${yt_info[0].channel.name}***`, inline: true })
            .addFields({ name: "type", value: `***${yt_info[0].type}***`, inline: true })
            .addFields({ name: "duration", value: `***${yt_info[0].durationRaw}***`, inline: false })
            .addFields({ name: "subido", value: `***${yt_info[0].uploadedAt}***`, inline: false })
            .setThumbnail(`${yt_info[0].thumbnails[0].url}`)

        interaction.reply({ embeds: [embed] });

    },
    walkout: async (interaction) => {
        let yt_info = await play.search("intro de la pais league, msucia de equipos, full || sin goles", {
            limit: 1
        })

        const stream = await play.stream(yt_info[0].url, { discordPlayerCompatibility: true })

        const conection = joinVoiceChannel({
            channelId: '1100159483096871002',
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        const resource = createAudioResource(stream.stream, {
            inputType: StreamType.Arbitrary
        })

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }
        });

        player.play(resource)
        conection.subscribe(player)

    },
    stadiumSounds: async (interaction) => {
        let yt_info = await play.search("LAS MEJORES CANCIONES DE HINCHADAS ARGENTINAS PARTE 2 | TonchoX", {
            limit: 1
        })

        const stream = await play.stream(yt_info[0].url, { discordPlayerCompatibility: true })

        const conection = joinVoiceChannel({
            channelId: '1100159483096871002',
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        const resource = createAudioResource(stream.stream, {
            inputType: StreamType.Arbitrary
        })

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }
        });

        player.play(resource)
        conection.subscribe(player)
    },
    goalSounds: async (interaction, team) => {
        let song = ""
        if (team === "556212831775883266") {
            song = "https://youtu.be/rWByFJmE-go"
        } else if (team === "468625328319889409") {
            song = "https://youtu.be/2QkUYRj1KuI"
        } else if (team === "511733001856483329") {
            song = "https://youtu.be/57ieEDAcCek"
        } else if (team === "577824842682728450") {
            song = "https://youtu.be/u7rTF1FvPVU"
        } else if (team === "525492144782180362") {
            song = "https://youtu.be/zT5H4ss1w90"
        } else if (team === "552948440112300047") {
            song = "https://youtu.be/aWjW6Ch0rRw"
        }
        console.log(song)
        const team1 = await store.getTeam(team)
        interaction.channel.send(team1.hincha)
        const connection = joinVoiceChannel({
            channelId: "1100159483096871002",
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        })

        let args = song

        let stream = await play.stream(args)

        let resource = createAudioResource(stream.stream, {
            inputType: stream.type
        })

        let player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }
        })

        player.play(resource)

        return connection.subscribe(player)
    },
    show: async (interaction) => {
        let yt_info = await play.search("We Are One (Ole Ola) [The Official 2014 FIFA World Cup Song] (Olodum Mix)", {
            limit: 1
        })

        const stream = await play.stream(yt_info[0].url, { discordPlayerCompatibility: true })

        const conection = joinVoiceChannel({
            channelId: '1100159483096871002',
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        const resource = createAudioResource(stream.stream, {
            inputType: StreamType.Arbitrary
        })

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }
        });

        player.play(resource)
        conection.subscribe(player)
    }

}