const modelT = require('./models/team');
const modelP = require('./models/players');
const modelM = require("./models/matchs")

const createTeam = (name, president) => {
    const team = new modelT({
        name,
        president,
    });
    return team.save();
}

const teamFounder = async (president) => {
    return { lenght: (await modelT.find({ president: president })).length, query: await modelT.find({ president: president }) };
}

const listAllPlayers = async () => {
    try {
        let playersInfo = [];
        const response = await modelP.find({});
        for (let i = 0; i < response.length; i++) {
            playersInfo.push(response[i]);
        }
        return playersInfo;
    } catch (e) {
        console.log(e);
    }
}

const listOnePlayer = async (player) => {
    try {
        const response = await modelP.find({ id: player });

        return response;
    } catch (e) {
        console.log(e);
    }
}

const addPlayers = async (jugadores) => {
    for (let i = 0; i < jugadores.length; i++) {
        const player = new modelP({
            id: i,
            stats: { stats: jugadores[i] }
        });
        await player.save();
    }
    return
}

const buyOnePlayer = async (player, president, message) => {
    const team = await modelT.findOne({ president: president });
    const teamId = team._id;
    const playerBuy = await modelP.findOne({ id: player });
    // handle errors here
    if (!team) return message.channel.send('no puedes fichar un jugador si no tienes equipo, primero registra tu equipo!!')
    if (!playerBuy) return message.channel.send('no existe jugador con ese id')
    if (playerBuy.team !== null) return message.channel.send(` el jugador ya a sido fichado por el equipo: ${await playerBuy.populate("team").then(async (team) => { return `***${team.team.name}***` })} por lo tanto no puedes incorporarlo`);
    if (team.money < playerBuy.stats["stats"].precio) return message.channel.send(`el fichaje de ${playerBuy.stats["stats"].nombre} por ${playerBuy.stats["stats"].precio} no se puede realizar ya que solo te quedan ${team.money} MILLONES `)

    //update team information
    await team.updateOne({ $push: { players: playerBuy._id } })
    await team.updateOne({ $set: { money: (team.money - playerBuy.stats["stats"].precio) } })

    //update player information
    playerBuy.team = teamId
    await playerBuy.save();
    return message.channel.send(`el fichaje de ${playerBuy.stats["stats"].nombre} por la cantidad de ${playerBuy.stats["stats"].precio} Millones de pesos al equipo ${await playerBuy.populate("team").then(async (team) => { return `***${team.team.name}***` })} fue totalmente exitoso!`)

}

const view = async (president) => {
    const team = await modelT.findOne({ president: president });
    var playersInfo = []
    await team.populate({
        path: 'players',
    }).then((player) => {
        for (let i in player.players) {
            playersInfo.push(player.players[i].stats["stats"].nombre)
        }
    })
    return {
        "name": team.name,
        "president": team.president,
        "players": playersInfo,
        "money": team.money
    }
}

const getPlayersTeam = async (president) => {
    const team = await modelT.findOne({ president: president });
    var playersInfo = []
    await team.populate({
        path: 'players',
    }).then((player) => {
        for (let i in player.players) {
            playersInfo.push(player.players[i])
        }
    })

    return playersInfo;
}

const setFormation = async (formation, president) => {
    const team = await modelT.findOne({ president: president });
    team.formation = formation; //save formation in DB
    return await team.save();
}

const setStyle = async (style, president, action) => {
    const team = await modelT.findOne({ president: president });
    if (action === "get") { return team.style }
    team.style = style; //save style in DB
    return await team.save();
}

const getTeam = async (president) => {
    const team = await modelT.findOne({ president: president });
    return team;
}

const createMacth = async (president1, president2, scoreTeam1, scoreTeam2) => {
    const team1 = await modelT.findOne({ president: president1 });
    const team2 = await modelT.findOne({ president: president2 });

    const match = new modelM();

    match.teams = [team1._id, team2._id]

    await match.save();

    return match._id

}

const addGoal = async (team, matchID, score) => {
    const match = await modelM.findOne({ _id: matchID });
    if (team == 1) return await match.updateOne({ $set: { scoreTeam1: match.scoreTeam1 + 1 } })
    if (team == 2) return await match.updateOne({ $set: { scoreTeam2: match.scoreTeam2 + 1 } })
    return console.log("Error al añadir el gol a la Base de datos");

}

const getScore = async (match) => {
    const match1 = await modelM.findOne({ _id: match });
    return {
        "scoreTeam1": match1.scoreTeam1,
        "scoreTeam2": match1.scoreTeam2
    }
}

const setPoints = async (president, points) => {
    const team = await modelT.findOne({ president: president });
    team.points = (team.points + points)
    return await team.save();
}

const addGoalStats = async (playerName, match) => {
    let match1 = await modelM.findOne({ _id: match });
    return await match1.updateOne({ $push: { scorers: playerName } });

}

const getScorers = async (match) => {
    const match2 = await modelM.findOne({ _id: match })
    let scorers = []

    for (let i in match2.scorers) {
        scorers.push(match2.scorers[i]);
    }
    return scorers
}

const addMatch = async (match, president) => {
    let team = await modelT.findOne({ president: president });
    return await team.updateOne({ $push: { matchs: match } })

}

const addGoalPlayer = async (playerId) => {
    let player = await modelP.findById({ _id: playerId })
    player.goals = player.goals + 1
    await player.save()
}

module.exports = {
    createTeam,
    teamFounder,
    addPlayers,
    listAllPlayers,
    listOnePlayer,
    buyOnePlayer,
    view,
    setFormation,
    setStyle,
    getPlayersTeam,
    getTeam,
    createMacth,
    addGoal,
    getScore,
    setPoints,
    addGoalStats,
    getScorers,
    addMatch,
    addGoalPlayer
}
