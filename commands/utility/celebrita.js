const { SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("celebrita")
    .setDescription("KDD CS PLISSS")
    .addUserOption((option) =>
      option.setName("user").setDescription("koho vyspamovat").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("text").setDescription("co mu chces").setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("number")
        .setDescription("kolikrat (5-20, default 10)")
        .setMinValue(5)
        .setMaxValue(20)
        .setDefaultValue(10)
        .setRequired(true)
    ),
  // TODO: Add cooldown to this command
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
      ephemeral: false,
    });

    const number = interaction.options.getNumber("number");
    if (number < 5 || number > 20) {
      return interaction.reply({
        content: "Zadej cislo mezi 5 a 20",
        ephemeral: true,
      });
    }

    for (let i = 0; i < number; i++) {
      await interaction.channel.send(
        `<@!${
          interaction.options.getUser("user").id
        }> ${interaction.options.getString("text")}`
      );
    }
  },
};
