const { EmbedBuilder } = require('discord.js');

class InviteCommand {
  constructor() {
    this.name = 'invite';
    this.description = 'Affiche le lien pour inviter ce bot sur un serveur.';
  }

  async execute(client, message, args) {
    const inviteEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Inviter le bot')
      .setDescription('Vous pouvez inviter ce bot sur votre serveur avec ce lien:')
      .addFields({ name: 'Lien', value: 'https://discord.com/api/oauth2/authorize?client_id=1025079577447514215&permissions=8&scope=bot' });

    message.channel.send({ embeds: [inviteEmbed] });
  }
}

module.exports = InviteCommand;
