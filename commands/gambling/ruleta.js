const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const UserProfile = require("../../schemas/UserProfile");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ruleta")
    .setDescription("Hraj ruletu a vyhraj kredity!")
    .addIntegerOption((option) =>
      option
        .setName("sazka")
        .setDescription("Kolik chceš vsadit (minimálně 10)")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      const sazka = interaction.options.getInteger("sazka");
      if (sazka < 10) {
        return interaction.editReply({
          content: "Musis vsadit alespoň 10 kreditu, ty zidovska mrdko",
          ephemeral: true,
        });
      }
      let userProfile = await UserProfile.findOne({
        userId: interaction.user.id,
      });
      if (userProfile) {
        if (userProfile.balance < sazka) {
          return interaction.editReply({
            content: "Nemáš dostatek kreditů, ty chudáku.",
            ephemeral: true,
          });
        }
        userProfile.balance -= sazka;
        await userProfile.save();
        const win = Math.random() < 0.5; // 50% šance na výhru
        if (win) {
          const vyhra = sazka * 2; // Dvojnásobek sázky
          userProfile.balance += vyhra;
          await userProfile.save();
          const resultEmbed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("Výhra!")
            .setDescription(`Vyhrals **${vyhra}** kreditů!`)
            .setFooter({
              text: `Tvuj novy balanc: ${userProfile.balance}`,
            });
          return interaction.editReply({ embeds: [resultEmbed] });
        } else {
          const resultEmbed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("Prohrals!")
            .setDescription(`Prohrals **${sazka}** kreditů.`)
            .setFooter({
              text: `Tvůj novy balanc: ${userProfile.balance}`,
            });
          return interaction.editReply({ embeds: [resultEmbed] });
        }
      } else {
        userProfile = new UserProfile({
          userId: interaction.user.id,
          balance: 0,
        });
      }
    } catch (error) {
      console.error("Error executing ruleta command:", error);
      return interaction.editReply({
        content: "necos pojebal, koukni do konzole",
        ephemeral: true,
      });
    }
  },
};
