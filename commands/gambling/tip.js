const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const UserProfile = require("../../schemas/UserProfile");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tip")
    .setDescription("davej dyzka homeboyum")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("komu chces dat dyzku")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("kolik chces dat dyzku")
        .setRequired(true)
        .setMinValue(1)
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      const user = interaction.options.getUser("user");
      let userProfile = await UserProfile.findOne({
        userId: interaction.user.id,
      });
      let targetProfile = await UserProfile.findOne({
        userId: user.id,
      });

      if (userProfile) {
        const amount = interaction.options.getInteger("amount");
        if (userProfile.balance < amount) {
          return interaction.editReply({
            content: "SES CHUDEJ KOKOTE",
            ephemeral: true,
          });
        }
        userProfile.balance -= amount;
        await userProfile.save();

        if (targetProfile) {
          targetProfile.balance += amount;
          await targetProfile.save();
        } else {
          targetProfile = new UserProfile({
            userId: user.id,
            balance: amount,
          });
          await targetProfile.save();
        }

        const resultEmbed = new EmbedBuilder()
          .setColor("Green")
          .setTitle("Dyzko poslano!")
          .setDescription(`Dal jsi **${amount}** kreditu **${user.username}**.`)
          .setFooter({
            text: `Tvůj novy balanc: ${userProfile.balance}`,
          });

        return interaction.editReply({ embeds: [resultEmbed] });
      } else {
        userProfile = new UserProfile({
          userId: interaction.user.id,
          balance: 0,
        });
      }
      if (targetProfile) {
      } else {
        targetProfile = new UserProfile({
          userId: user.id,
          balance: 0,
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
