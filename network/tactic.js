const store = require('../storage/store');

const setFormation = async (formation, president, interaction) => {
    const response = await store.setFormation(formation, president);
    if (!response) return interaction.reply({ content: "Hubo un error al intentar setear tu formacion" })
    return interaction.reply({ content: "***Ahora tu formacion es una *** " + formation + " *** mucha suerte en la APIS LEAGUE***" })
}

const setStyle = async (style, president, interaction) => {
    const response = await store.setStyle(style, president);
    if (!response) return interaction.reply({ content: "Hubo un error al intentar setear tu estilo de juego" })
    return interaction.reply({ content: "***Ahora tu estilo de juego es *** " + style + " *** mucha suerte en la APIS LEAGUE***" })
}

module.exports = {
    setFormation,
    setStyle
}