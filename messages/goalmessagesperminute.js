const store = require('../storage/store')

const goalMessages = async (team, match, player, asistent, minute, message) => {
    var scoreA = (await store.getScore(match)).scoreTeam1 || 0 // get score
    var scoreB = (await store.getScore(match)).scoreTeam2 || 0 // get score
    var chance = Math.floor(Math.random() * 10) // set random message probability
    if (player.nombre === asistent.nombre) {
        // messages to individual performance
        message.channel.send("Gol individual")
    }
    // all posibles messages
    switch (chance) {
        case 0: return message.channel.send(`*** MINUTO ${minute}: *** Ahi esta ${player.nombre} recibe un pase de ${asistent.nombre} y define cruzado al palo más lejano. ¡Golazo! `)
        case 1: return message.channel.send(`*** MINUTO ${minute}: *** Que pelota de ${asistent.nombre} desborda por la banda derecha y centra raso para que ${player.nombre} empuje el balón a la red. ¡Gol de ${team.teamInfo.name}!`)
        case 2: return message.channel.send(`*** MINUTO ${minute}: *** ${player.nombre} recibe un pase filtrado de ${asistent.nombre} y define con un toque sutil al ángulo. ¡Qué definición!`)
        case 3: return message.channel.send(`*** MINUTO ${minute}: *** Muy bien por ${asistent.nombre} que recupera el balón en campo rival y habilita a ${player.nombre} que, tras eludir al portero, marca el gol de ${team.teamInfo.name}!. `)
        case 4: return message.channel.send(`*** MINUTO ${minute}: *** Ahi va ${player.nombre} se saca de encima a dos rivales, se adentra en el área y la clava en el ángulo. para ${team.teamInfo.name}!`)
        case 5: return message.channel.send(`*** MINUTO ${minute}: *** ${asistent.nombre} gana un balón dividido en el mediocampo CON MUCHO HUEVO CARAJO y lanza un pase en profundidad para ${player.nombre}, que define con un derechazo al primer palo. ¡Gol! `)
        case 6: return message.channel.send(`*** MINUTO ${minute}: *** ${player.nombre} recibe un centro desde la izquierda de ${asistent.nombre} y cabecea al segundo palo. golazo de${team.teamInfo.name}! `)
        case 7: return message.channel.send(`*** MINUTO ${minute}: *** ${asistent.nombre} se interna en el área rival y asiste a ${player.nombre}, quien define de zurda al primer palo. ${team.teamInfo.name} hace el goll!`)
        case 8: return message.channel.send(`*** MINUTO ${minute}: *** ${player.nombre} recibe un pase largo de ${asistent.nombre} y se va en velocidad, TA TAN TA TAN elude al portero y marca a puerta vacía para ${team.teamInfo.name}!`)
        case 9: return message.channel.send(`*** MINUTO ${minute}: ***  ${asistent.nombre} gana un balón en el área rival y le sirve un pase a ${player.nombre}, quien define con un toque suave al palo más lejano. ¡Golazo!`)

    }
}

const failMessages = async (team, match, player, asistent, minute, message) => {
    var scoreA = (await store.getScore(match)).scoreTeam1 || 0 // get score
    var scoreB = (await store.getScore(match)).scoreTeam2 || 0 // get score
    var chance = Math.floor(Math.random() * 10);
    switch (chance) {
        case 1: return message.channel.send(`*** MINUTO ${minute}: *** Y el balón se va desviado del arco! ${player.nombre} no pudo concretar esta oportunidad de oro para su equipo. Esto puede ser un golpe anímico muy fuerte para él.`)
        case 2: return message.channel.send(`*** MINUTO ${minute}: *** ¡Qué lástima para el equipo de ${player.nombre}! Esa jugada prometía y terminó en una oportunidad fallida. Esperemos que puedan recuperarse pronto.`)
        case 3: return message.channel.send(`*** MINUTO ${minute}: *** ¡Y se va desviado! ${player.nombre} no tuvo suerte en esta ocasión. A veces los jugadores más talentosos también fallan, y esta vez la pelota no quiso entrar.`)
        case 4: return message.channel.send(`*** MINUTO ${minute}: ***¡El estadio se queda sin aliento! ${player.nombre} tenía una gran oportunidad, pero la pelota terminó fuera del arco. Esto puede ser un momento clave en el partido. `)
        case 5: return message.channel.send(`*** MINUTO ${minute}: *** ¡El arquero rival respira aliviado! ${player.nombre} tuvo una buena chance, pero no pudo capitalizarla. Ahora su equipo debe seguir presionando para no dejar pasar más oportunidades como esta.`)
        case 6: return message.channel.send(`*** MINUTO ${minute}: ***¡Qué oportunidad se acaba de perder ${player.nombre}! Este tipo de jugadas pueden ser muy costosas en un partido. Esperemos que no se arrepientan de no haber concretado esta chance. `)
        case 7: return message.channel.send(`*** MINUTO ${minute}: *** ¡No puede ser! ${player.nombre} estaba tan cerca de anotar el gol, pero la pelota terminó afuera. Este tipo de situaciones pueden ser muy frustrantes para un jugador. `)
        case 8: return message.channel.send(`*** MINUTO ${minute}: *** ¡La afición no puede creerlo! ${player.nombre} tenía todo para anotar, pero falló en la definición. Esto puede ser un momento decisivo en el partido.`)
        case 9: return message.channel.send(`*** MINUTO ${minute}: *** ¡La pelota se va lejos del arco! ${player.nombre} debe estar lamentando esta oportunidad perdida. Pero aún queda mucho partido por delante, y su equipo debe seguir adelante.`)
        case 10: return message.channel.send(`*** MINUTO ${minute}: *** ¡La defensa rival respira aliviada! ${player.nombre} no pudo concretar esta ocasión, y eso puede ser un respiro para el equipo contrario. Ahora deben estar muy concentrados para no permitir más chances como esta.`)

    }
}


module.exports = {
    goalMessages,
    failMessages
}