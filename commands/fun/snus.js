const { SlashCommandBuilder } = require("discord.js");
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

    const snus = Math.random() < 0.5 ? "vlevo" : "vpravo";
    await interaction.reply(`dej to ${snus}`);
  },
};
