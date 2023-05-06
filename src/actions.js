const messages = require("../messages/goalmessagesperminute")
const store = require("../storage/store")
const stream = require('../music/play')


const goal = async (team, minute, match, message) => {
    try {
        // select a player to shoot and asistent 
        var player = team.players.filter((playerShoot) => { return (playerShoot.stats.stats.pos === "delantero" || playerShoot.stats.stats.pos === "mediocampista" || playerShoot.stats.stats.pos === "defensor") });
        let choiceToPlayer = Math.floor(Math.random() * player.length) || 0
        var choicePLayer = player[choiceToPlayer].stats["stats"]

        var asistent = team.players.filter((playerShoot) => { return (playerShoot.stats.stats.pos === "delantero" || playerShoot.stats.stats.pos === "mediocampista" || playerShoot.stats.stats.pos === "defensor") });
        let choiceToAsistent = Math.floor(Math.random() * asistent.length) || 0
        var choiceAsistent = asistent[choiceToAsistent].stats["stats"]

        let indexToGoal = 0; // probability to player make a goal

        // chance to goal 
        if (choicePLayer.attr.remate < 50) indexToGoal = 5
        if (choicePLayer.attr.remate > 50 && choicePLayer.attr.remate < 60) indexToGoal = 10
        if (choicePLayer.attr.remate > 60 && choicePLayer.attr.remate < 70) indexToGoal = 30
        if (choicePLayer.attr.remate > 70 && choicePLayer.attr.remate < 80) indexToGoal = 40
        if (choicePLayer.attr.remate > 80 && choicePLayer.attr.remate < 90) indexToGoal = 60
        if (choicePLayer.attr.remate > 90) indexToGoal = 100


        let randomNumberToGoal = Math.floor(Math.random() * 150)
        // if the player fail the opportunity
        if (randomNumberToGoal > indexToGoal) return await messages.failMessages(team, match, choicePLayer, choiceAsistent, minute, message)
        // if the player make goal
        await store.addGoal(team.side, match)// add Goal to DB
        await store.addGoalPlayer(player[choiceToPlayer]._id)// add goal to scorer history
        await store.addGoalStats(choicePLayer.nombre, match) // add player to scorer list
        await messages.goalMessages(team, match, choicePLayer, choiceAsistent, minute, message) // send message
        return await stream.goalSounds(message, team.teamInfo.president) // add Goal sound to celebrate the goal
    } catch (err) {
        console.log('Hubo un error en la funcion goal ' + err)
    }

}



module.exports = { goal }