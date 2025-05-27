const { SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("celebrita")
    .setDescription("KDD CS PLISSS"),
  async execute(interaction) {
    for (let i = 0; i < 10; i++) {
      await interaction.channel.send(`<@!${process.env.kd1ID}>`);
    }
  },
};
