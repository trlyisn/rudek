const { SlashCommandBuilder } = require("discord.js");
require("dotenv").config();
let danverdMute = false;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("danverd")
    .setDescription("jmenuji se stanislav bobak a jsem tlstly"),
  async execute(interaction) {
    if (
      interaction.user.id !== process.env.pikabooID &&
      interaction.user.id !== process.env.kd1ID
    ) {
      return interaction.reply({
        content: "jdi do prdele, ty zkurvenej curaku",
        ephemeral: true,
      });
    }

    if (danverdMute === false) {
      danverdMute = true;
    } else {
      danverdMute = false;
    }
    const danverdID = process.env.danverdPicoID;
    const guild = interaction.guild;

    if (danverdMute) {
      setInterval(async () => {
        const member = await guild.members.fetch(danverdID).catch(() => null);
        if (member?.voice?.channel && danverdMute) {
          await member.voice.disconnect().catch(() => {});
        }
      }, 1000);
    }

    await interaction.reply("top 1 big mac eater in narnia");
  },
};
