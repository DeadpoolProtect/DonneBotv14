const { EmbedBuilder } = require('discord.js');

class PingCommand {
    constructor() {
        this.name = "ping";
        this.description = "Affiche le ping du bot.";
    }

    async execute(client, interaction) {
        const pingEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Ping')
            .setDescription("🏓 Pong")
            .addFields(
                { name: 'Latence :', value: `${Date.now() - interaction.createdTimestamp}ms.` },
            )
            .setTimestamp()

        interaction.reply({ embeds: [pingEmbed] });
    }
}

module.exports = PingCommand;
