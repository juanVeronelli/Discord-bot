const store = require("../storage/store");


const tacticMessage = async (team1, message, newMinute) => {
    const team = await store.getTeam(team1.teamInfo.president)
    const style = team.style
    let rnNumer = Math.floor(Math.random() * 10)
    if (style === "posesion") {
        switch (rnNumer) {
            case 0: return message.channel.send(`***Minuto ${newMinute}:*** toca el balo, tiene la posesion ${team1.teamInfo.name}`)
            case 1: return message.channel.send(`***Minuto ${newMinute}:*** el balon es propiedad de ${team1.teamInfo.name}, no la sueltan`)
            case 2: return message.channel.send(`***Minuto ${newMinute}:*** toca el central, abre la pelota, dominio de posesion ,todos en sus roles`)
            case 3: return message.channel.send(`***Minuto ${newMinute}:*** laterall para ${team1.teamInfo.name}, lo hacen rapido se abre la defensa puede estar el golll, el 1!!! ataja el arquero`)
            case 4: return message.channel.send(`***Minuto ${newMinute}:*** posesion y dominio ABSOLUTO de la pelota por parte de ${team1.teamInfo.name}, ¿sera suficiente para que ganen el partido?`)
            case 5: return message.channel.send(`***Minuto ${newMinute}: *** A buenooo pero le tiro un osito de peluche al arquero, era un ataque prometedor de ${team1.teamInfo.name}`)
            case 6: message.channel.send(`***Minuto ${newMinute}: ***¿Ariel que opinas del juego que por ahora desenvuelven ambos equipos?`); return message.channel.send(`***Minuto ${newMinute}: ***Por ahora ambos equipos estan muys estaticos, necesitamos mas futbol Rodo!!`)
            case 7: message.channel.send(`***Minuto ${newMinute}: ***More contame como lo vive el ¿presidente local?`); return message.channel.send(`***Minuto ${newMinute}:*** Se para, se mueve de un lado al otro, no esta conforme con lo que hace su equipo ahora mismo`)
            case 8: message.channel.send(`***Minuto ${newMinute}: ***y el presidente que hoy visita, contame More`); return message.channel.send(`***Minuto ${newMinute}:*** Habla con su ayudante, con su preparador, creo que se vienen cambios en la visita Rodo`)
            case 9: return message.channel.send(`***Minuto ${newMinute}: *** AHI ESTAAAA GOOOOOOOOOOOOOOOL, UUU no vale, no vale, no vale, OFFSIDEEE ${team1.teamInfo.name} y un gol anulado`)
        }
    } else if (style === "contragolpe") {
        switch (rnNumer) {
            case 0: return message.channel.send(`***Minuto ${newMinute}:*** bloque bajo de ${team1.teamInfo.name}, esperan poder salir al contragolpe ordenados`)
            case 1: return message.channel.send(`***Minuto ${newMinute}:*** recupera ${team1.teamInfo.name}, se lanzan en velocidad, letal contragolpeeee, POSTEEEEEEEE, madera en api stadium!!`)
            case 2: return message.channel.send(`***Minuto ${newMinute}:*** buen control de la defensa, solido bloque bajo por parte de ${team1.teamInfo.name}`)
            case 3: return message.channel.send(`***Minuto ${newMinute}:*** laterall para ${team1.teamInfo.name}, lo hacen rapido se abre la defensa puede estar el golll, el 1!!! ataja el arquero`)
            case 4: return message.channel.send(`***Minuto ${newMinute}:*** parece clara la estrategia de ${team1.teamInfo.name}, busan contragolpear a grandes velocidades`)
            case 5: return message.channel.send(`***Minuto ${newMinute}: *** A buenooo pero le tiro un osito de peluche al arquero, era un ataque prometedor de ${team1.teamInfo.name}`)
            case 6: message.channel.send(`***Minuto ${newMinute}: ***¿Ariel que opinas del juego que por ahora desenvuelven ambos equipos?***`); return (`***Minuto ${newMinute}: *** Por ahora ambos equipos estan muys estaticos, necesitamos mas futbol Rodo!!`)
            case 7: message.channel.send(`***Minuto ${newMinute}: ***More contame como lo vive el ¿presidente local? ***`); return message.channel.send(`***Minuto ${newMinute}:*** Se para, se mueve de un lado al otro, no esta conforme con lo que hace su equipo ahora mismo`)
            case 8: message.channel.send(`***Minuto ${newMinute}: ***y el presidente que hoy visita, contame More ***`); return message.channel.send(`***Minuto ${newMinute}:*** Habla con su ayudante, preparador, creo que se vienen cambios en la visita Rodo`)
            case 9: return message.channel.send(`***Minuto ${newMinute}: *** AHI ESTAAAA GOOOOOOOOOOOOOOOL, UUU no vale, no vale, no vale, OFFSIDEEE ${team1.teamInfo.name} y un gol anulado`)
        }
    } else if (style === "catenaccio") {
        switch (rnNumer) {
            case 0: return message.channel.send(`***Minuto ${newMinute}:*** gran trabajo defensivo del presidente de ${team1.teamInfo.name}, ES UNA MURALLA EL EQUIPO`)
            case 1: return message.channel.send(`***Minuto ${newMinute}:*** ${team1.teamInfo.name} ejecuta perfectamente su tactica, no hay ocasiones por parte del rival, totalmente funcional`)
            case 2: return message.channel.send(`***Minuto ${newMinute}:*** buen control de la defensa, solido bloque bajo por parte de ${team1.teamInfo.name}`)
            case 3: return message.channel.send(`***Minuto ${newMinute}:*** laterall para ${team1.teamInfo.name}, lo hacen rapido se abre la defensa puede estar el golll, el 1!!! ataja el arquero`)
            case 4: return message.channel.send(`***Minuto ${newMinute}:*** parece clara la estrategia de ${team1.teamInfo.name}, gran bloque bajo y a no sufrir`)
            case 5: return message.channel.send(`***Minuto ${newMinute}: *** A buenooo pero le tiro un osito de peluche al arquero, era un ataque prometedor de ${team1.teamInfo.name}`)
            case 6: message.channel.send(`***Minuto ${newMinute}: ***¿Ariel que opinas del juego que por ahora desenvuelven ambos equipos?***`); return (`***Minuto ${newMinute}: ***Por ahora ambos equipos estan muys estaticos, necesitamos mas futbol Rodo!!`)
            case 7: message.channel.send(`***Minuto ${newMinute}: ***More contame como lo vive el ¿presidente local? ***`); return message.channel.send(`***Minuto ${newMinute}:*** Se para, se mueve de un lado al otro, no esta conforme con lo que hace su equipo ahora mismo`)
            case 8: message.channel.send(`***Minuto ${newMinute}: ***y el presidente que hoy visita, contame More ***`); return message.channel.send(`***Minuto ${newMinute}:*** Habla con su ayudante, preparador, creo que se vienen cambios en la visita Rodo`)
            case 9: return message.channel.send(`***Minuto ${newMinute}: *** AHI ESTAAAA GOOOOOOOOOOOOOOOL, UUU no vale, no vale, no vale, OFFSIDEEE ${team1.teamInfo.name} y un gol anulado`)
        }
    } else if (style === "tikitaka") {
        switch (rnNumer) {
            case 0: return message.channel.send(`*** Minuto ${newMinute}:*** se abre la defensa, baja el delantero se abre un espacio, balon largo puede serrrrr afueraaa, increible lo que acaba de errar ${team1.teamInfo.name}`)
            case 1: return message.channel.send(`*** Minuto ${newMinute}:*** ${team1.teamInfo.name} junta pases, 1, 2, 3, 4 EXCLENTE COMBINACION bola atrasssss, recupera bien la defensa!!`)
            case 2: return message.channel.send(`*** Minuto ${newMinute}:*** ${team1.teamInfo.name} y una gran jugada individual, combinacion a gran velocidad ahi estaaaaaaaaaaaaaaaaaa, PALLLLLLLLOOOOOOOO`)
            case 3: return message.channel.send(`*** Minuto ${newMinute}:*** laterall para ${team1.teamInfo.name}, lo hacen rapido se abre la defensa puede estar el golll, el 1!!! ataja el arquero`)
            case 4: return message.channel.send(`*** Minuto ${newMinute}:*** parece clara la estrategia de ${team1.teamInfo.name}, salir jugando a gran velocidad y combinaciones entre los mediocapistas`)
            case 5: return message.channel.send(`***Minuto ${newMinute}: *** A buenooo pero le tiro un osito de peluche al arquero, era un ataque prometedor de ${team1.teamInfo.name}`)
            case 6: message.channel.send(`***Minuto ${newMinute}: ***¿Ariel que opinas del juego que por ahora desenvuelven ambos equipos?***`); return (`***Minuto ${newMinute}: ***Por ahora ambos equipos estan muys estaticos, necesitamos mas futbol Rodo!!`)
            case 7: message.channel.send(`***Minuto ${newMinute}: ***More contame como lo vive el ¿presidente local? ***`); return message.channel.send(`***Minuto ${newMinute}:*** Se para, se mueve de un lado al otro, no esta conforme con lo que hace su equipo ahora mismo`)
            case 8: message.channel.send(`***Minuto ${newMinute}: ***y el presidente que hoy visita, contame More ***`); return message.channel.send(`***Minuto ${newMinute}:*** Habla con su ayudante, preparador, creo que se vienen cambios en la visita Rodo`)
            case 9: return message.channel.send(`***Minuto ${newMinute}: *** AHI ESTAAAA GOOOOOOOOOOOOOOOL, UUU no vale, no vale, no vale, OFFSIDEEE ${team1.teamInfo.name} y un gol anulado`)
        }
    } else if (style === "equilibrado") {
        switch (rnNumer) {
            case 0: return message.channel.send(`*** Minuto ${newMinute}:*** ${team1.teamInfo.name} juega bien la pelota, defiende bien, ataca bien, ¿HACEN TODO BIEN? `)
            case 1: return message.channel.send(`*** Minuto ${newMinute}:*** ${team1.teamInfo.name}, Gran error en defensa, puede serrrrrrrr, rebota en la defensa, ${team1.teamInfo.name} pudo haber sufirdo un error garrafal`)
            case 2: return message.channel.send(`*** Minuto ${newMinute}:*** pelotazo largo de ${team1.teamInfo.name}, no llega a destino y se va al lateral`)
            case 3: return message.channel.send(`*** Minuto ${newMinute}:*** BUENA COMBINACION, centro al area, sale el arquero y se queda la pelota`)
            case 4: return message.channel.send(`*** Minuto ${newMinute}:*** parece clara la estrategia de ${team1.teamInfo.name}, no se arriesga innecesariamente`)
            case 5: return message.channel.send(`***Minuto ${newMinute}: *** A buenooo pero le tiro un osito de peluche al arquero, era un ataque prometedor de ${team1.teamInfo.name}`)
            case 6: message.channel.send(`***Minuto ${newMinute}: ***¿Ariel que opinas del juego que por ahora desenvuelven ambos equipos?***`); return (`***Minuto ${newMinute}: ***Por ahora ambos equipos estan muys estaticos, necesitamos mas futbol Rodo!!`)
            case 7: message.channel.send(`***Minuto ${newMinute}: ***More contame como lo vive el ¿presidente local? ***`); return message.channel.send(`***Minuto ${newMinute}:*** Se para, se mueve de un lado al otro, no esta conforme con lo que hace su equipo ahora mismo`)
            case 8: message.channel.send(`***Minuto ${newMinute}: ***y el presidente que hoy visita, contame More ***`); return message.channel.send(`***Minuto ${newMinute}:*** Habla con su ayudante, preparador, creo que se vienen cambios en la visita Rodo`)
            case 9: return message.channel.send(`***Minuto ${newMinute}: *** AHI ESTAAAA GOOOOOOOOOOOOOOOL, UUU no vale, no vale, no vale, OFFSIDEEE ${team1.teamInfo.name} y un gol anulado`)
        }
    }
}

module.exports = { tacticMessage }

