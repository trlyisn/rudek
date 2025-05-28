const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const UserProfile = require("../../schemas/UserProfile");

const emojiList = ["🍒", "🍋", "🍊", "🍉", "🍇", "🍓", "🍍", "🍎", "🍏", "🍌"];

function getRandomEmoji() {
  const randomIndex = Math.floor(Math.random() * emojiList.length);
  return emojiList[randomIndex];
}

module.exports = {
  data: new SlashCommandBuilder().setName("slot").setDescription("tocky tocky"),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      let userProfile = await UserProfile.findOne({
        userId: interaction.user.id,
      });

      if (userProfile) {
        if (userProfile.balance < 10) {
          return interaction.editReply({
            content: "Musis mi aspon deset kretidu, ty chuda mrdko",
            ephemeral: false,
          });
        }
        userProfile.balance -= 10;
        await userProfile.save();

        const slotResults = [
          getRandomEmoji(),
          getRandomEmoji(),
          getRandomEmoji(),
        ];

        const isWin = slotResults.every((emoji) => emoji === slotResults[0]);

        if (isWin) {
          userProfile.balance += 20;
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

        await interaction.reply({ embeds: [resultEmbed] });
      } else {
        userProfile = new UserProfile({
          userId: interaction.user.id,
          balance: 0,
        });
      }
    } catch (error) {
      console.error("Error executing slot command:", error);
      return interaction.reply({
        content: "necos pojebal, koukni do konzole, ty zkurvenej curaku",
        ephemeral: true,
      });
    }
  },
};
