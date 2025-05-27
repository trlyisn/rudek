const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ltypecek")
    .setDescription("lgay ltypecek"),
  async execute(interaction) {
    await interaction.deferReply();
    try {
      await interaction.editReply({
        content: "...",
      });
    } catch (error) {
      console.error("Error executing ltypecek command:", error);
      await interaction.editReply({
        content: "necos pojebal, koukni do konzole",
        ephemeral: true,
      });
    }
  },
};
