const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const UserProfile = require("../../schemas/UserProfile");

const emojiList = ["🍒", "🍋", "🍊", "🍉", "🍇", "🍓", "🍍", "🍎", "🍏", "🍌"];

function getRandomEmoji() {
  const randomIndex = Math.floor(Math.random() * emojiList.length);
  return emojiList[randomIndex];
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slot")
    .setDescription("tocky tocky")
    .addIntegerOption((option) =>
      option
        .setName("sazka")
        .setDescription("Kolik chceš vsadit (minimálně 10)")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      let userProfile = await UserProfile.findOne({
        userId: interaction.user.id,
      });

      let sazka = interaction.options.getInteger("sazka");

      if (userProfile) {
        if (userProfile.balance < sazka) {
          return interaction.editReply({
            content: "Musis mit tolik kolik chces vsadit, ty chuda mrdko",
            ephemeral: false,
          });
        }

        if (interaction.options.getInteger("sazka") < 10) {
          return interaction.editReply({
            content: "Musis vsadit alespoň 10 kreditu, ty zidovska mrdko",
            ephemeral: true,
          });
        }

        userProfile.balance -= sazka;
        await userProfile.save();

        const slotResults = [
          getRandomEmoji(),
          getRandomEmoji(),
          getRandomEmoji(),
        ];

        const isWin = slotResults.every((emoji) => emoji === slotResults[0]);

        if (isWin) {
          userProfile.balance += sazka * 100;
          await userProfile.save();
        }

        const resultEmbed = new EmbedBuilder()
          .setColor(isWin ? "Green" : "Red")
          .setTitle("vysledky slotu")
          .setDescription(`**Vysledek:** ${slotResults.join(" ")}`)
          .setFooter({
            text: isWin
              ? `Ses dobrej, vyhrals\nTvuj balanc: ${userProfile.balance}`
              : `ty pico zkurvena, prohrals\nTvuj balanc: ${userProfile.balance}`,
          });

        await interaction.editReply({ embeds: [resultEmbed] });
      } else {
        userProfile = new UserProfile({
          userId: interaction.user.id,
          balance: 0,
        });
      }
    } catch (error) {
      console.error("Error executing slot command:", error);
      return interaction.editReply({
        content: "necos pojebal, koukni do konzole, ty zkurvenej curaku",
        ephemeral: true,
      });
    }
  },
};
