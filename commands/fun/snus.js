const { SlashCommandBuilder } = require("discord.js");
const UserProfile = require("../../schemas/UserProfile");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("snus")
    .setDescription("left or right"),
  async execute(interaction) {
    if (interaction.user.id !== process.env.pikabooID) {
      return interaction.reply({
        content: "jdi do prdele, ty zkurvenej curaku",
        ephemeral: true,
      });
    }

    try {
      await interaction.deferReply();
      let userProfile = await UserProfile.findOne({
        userId: interaction.user.id,
      });

      if (userProfile) {
      } else {
        userProfile = new UserProfile({
          userId: interaction.user.id,
          snusCount: 0,
        });
      }
      const snus = Math.random() < 0.5 ? "vlevo" : "vpravo";
      userProfile.snusCount += 1;
      await userProfile.save();

      interaction.editReply(
        `dej to ${snus}, tvuj snus count je zatim ${userProfile.snusCount}`
      );
    } catch (error) {
      console.error("Error executing snus command:", error);
      interaction.editReply({
        content: "necos pojebal, koukni do konzole",
        ephemeral: true,
      });
    }
  },
};
