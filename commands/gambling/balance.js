const { SlashCommandBuilder } = require("discord.js");
const UserProfile = require("../../schemas/UserProfile");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("at vis kolik mas kreditu ty zasrana zidovska chuju")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("koho chces zkontrolovat")
        .setRequired(false)
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      const user = interaction.options.getUser("user") || interaction.user;
      let userProfile = await UserProfile.findOne({
        userId: user.id,
      });

      if (userProfile) {
        return interaction.editReply({
          content: `**${user.username}** ma **${userProfile.balance}** kreditu`,
          ephemeral: false,
        });
      } else {
        userProfile = new UserProfile({
          userId: user.id,
          balance: 0,
        });
        await userProfile.save();
        return interaction.editReply({
          content: `**${user.username}** nema zadny kredit, ale ted ma 0, levna cubka`,
          ephemeral: false,
        });
      }
    } catch (error) {
      console.error("Error executing balance command:", error);
      return interaction.editReply({
        content: "necos pojebal, koukni do konzole",
        ephemeral: true,
      });
    }
  },
};
