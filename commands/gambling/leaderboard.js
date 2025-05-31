const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const UserProfile = require("../../schemas/UserProfile");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Zobrazit leaderboard s kredity"),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      const userProfiles = await UserProfile.find()
        .sort({ balance: -1 })
        .limit(10);
      if (userProfiles.length === 0) {
        return interaction.editReply({
          content: "vsichni jsou chudaci, nikdo nema kredity",
          ephemeral: true,
        });
      }

      const leaderboard = userProfiles
        .map((profile, index) => {
          return `${index + 1}. <@${profile.userId}> - ${
            profile.balance
          } kreditů`;
        })
        .join("\n");

      const leaderboardEmbed = new EmbedBuilder()
        .setColor("Yellow")
        .setTitle("Leaderboard")
        .setDescription(`${leaderboard}`)
        .setFooter({
          text: `lets light up the scoreboard!`,
        });

      return interaction.editReply({ embeds: [leaderboardEmbed] });
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      return interaction.editReply({
        content: "Nastala chyba při načítání leaderboardu.",
        ephemeral: true,
      });
    }
  },
};
