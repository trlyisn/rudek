const { SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("celebrita")
    .setDescription("KDD CS PLISSS")
    .addUserOption((option) =>
      option.setName("user").setDescription("koho vyspamovat").setRequired(true)
    ),
  async execute(interaction) {
    if (
      interaction.user.id !== process.env.pikabooID &&
      interaction.user.id !== process.env.kd1ID &&
      interaction.user.id !== process.env.ltypecekID
    ) {
      return interaction.reply({
        content: "jdi do prdele, ty zkurvenej curaku",
        ephemeral: true,
      });
    }

    await interaction.reply({
      content: "KDD CS PLISSS",
      ephemeral: true,
    });

    for (let i = 0; i < 10; i++) {
      await interaction.channel.send(
        `<@!${interaction.options.getUser("user").id}>`
      );
    }
  },
};
