const { CommandInteraction, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

class BanCommand {
    constructor() {
        this.name = "ban";
        this.description = "Bannir un utilisateur du serveur";
        this.options = [
            {
                name: 'utilisateur',
                description: 'L\'utilisateur à bannir',
                type: 6,
                required: true,
            },
            {
                name: 'raison',
                description: 'La raison du bannissement',
                type: 3,
                required: false,
            },
        ];
    }

    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const userToBan = interaction.options.getUser('utilisateur');
        const reason = interaction.options.getString('raison') || 'Aucune raison fournie';

        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle(`Utilisateur banni : ${userToBan.tag}`)
            .addField('Utilisateur', `${userToBan} (${userToBan.tag})`)
            .addField('Raison', reason)
            .addField('Modérateur', `${interaction.user} (${interaction.user.tag})`)
            .setTimestamp();

        
        if (!interaction.guild.me.permissions.has('BAN_MEMBERS')) {
            return interaction.reply({ content: 'Je n\'ai pas les permissions nécessaires pour bannir des membres.', ephemeral: true });
        }

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply({ content: 'Vous n\'avez pas les permissions nécessaires pour bannir des membres.', ephemeral: true });
        }

        try {
            await interaction.guild.bans.create(userToBan, { reason: reason });
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Une erreur est survenue lors du bannissement de cet utilisateur.', ephemeral: true });
        }
    }
}

module.exports = BanCommand;
