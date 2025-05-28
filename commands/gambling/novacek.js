const { SlashCommandBuilder } = require("discord.js");
const UserProfile = require("../../schemas/UserProfile");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("novacek")
    .setDescription("pokud nemas kredity, tak ti dam 500 kreditu :3"),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      let userProfile = await UserProfile.findOne({
        userId: interaction.user.id,
      });

      if (userProfile) {
        if (userProfile.balance >= 500) {
          return interaction.editReply({
            content: "Uz mas dost kreditu, ty chuda mrdko",
            ephemeral: false,
          });
        } else {
          userProfile.balance += 500;
          await userProfile.save();
          return interaction.editReply({
            content: `Dostal jsi 500 kreditu, ted jich mas ${userProfile.balance}`,
            ephemeral: false,
          });
        }
      } else {
        userProfile = new UserProfile({
          userId: interaction.user.id,
          balance: 500,
        });
        await userProfile.save();
        return interaction.editReply({
          content: "Dostal jsi 500 kreditu, ted jich mas 500",
          ephemeral: false,
        });
      }
    } catch (error) {
      console.error("Error deferring reply:", error);
      return interaction.editReply({
        content: "necos pojebal, koukni do konzole",
        ephemeral: true,
      });
    }
  },
};
