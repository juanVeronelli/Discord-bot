const store = require('../storage/store');
const fixture = require('../fixture')
const runMatch = require('../src/matchEngine')
const match = async (command, message) => {
    const matchday = message.content.slice(command.length).trim().split(/ +/g)[1]

    try {
        if (!command || !message) return
        const playersTeam1 = await store.getPlayersTeam(fixture.matchs.day1[matchday].team1);
        const playersTeam2 = await store.getPlayersTeam(fixture.matchs.day1[matchday].team2);

        if (!playersTeam1 || !playersTeam2) return

        const styleTeam1 = await store.setStyle('', fixture.matchs.day1[matchday].team1, "get");
        const styleTeam2 = await store.setStyle('', fixture.matchs.day1[matchday].team2, "get");

        const teamInfo1 = await store.getTeam(fixture.matchs.day1[matchday].team1)
        const teamInfo2 = await store.getTeam(fixture.matchs.day1[matchday].team2)

        if (!styleTeam1 || !styleTeam2) return

        await runMatch.startMatch({ "players": playersTeam1, "teamInfo": teamInfo1, "side": 1 }, { "styleTeam2": styleTeam2, "players": playersTeam2, "teamInfo": teamInfo2, "side": 2 }, message)


    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    match
}