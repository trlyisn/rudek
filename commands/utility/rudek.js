const { SlashCommandBuilder } = require("discord.js");
require("dotenv").config();
let rudekMute = false;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rudek")
    .setDescription("zkurvenej curak, ale i tak ho miluju"),
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

    if (rudekMute === false) {
      rudekMute = true;
    } else {
      rudekMute = false;
    }
    const rudekID = process.env.rudekPicoID;
    const guild = interaction.guild;

    if (rudekMute) {
      setInterval(async () => {
        const member = await guild.members.fetch(rudekID).catch(() => null);
        if (member?.voice?.channel && rudekMute) {
          await member.voice.disconnect().catch(() => {});
        }
      }, 1000);
    }

    await interaction.reply("done");
  },
};
