const { SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("celebrita")
    .setDescription("KDD CS PLISSS"),
  async execute(interaction) {
    if (interaction.user.id !== process.env.pikabooID) {
      return interaction.reply({
        content: "jdi do prdele, ty zkurvenej curaku",
        ephemeral: true,
      });
    }

    for (let i = 0; i < 10; i++) {
      await interaction.channel.send(`<@!${process.env.kd1ID}>`);
    }

    await interaction.reply({
      content: "KDD CS PLISSS",
      ephemeral: true,
    });
  },
};
