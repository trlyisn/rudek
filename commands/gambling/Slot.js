const { SlashCommandBuilder } = require("discord.js");

const emojiList = ["🍒", "🍋", "🍊", "🍉", "🍇", "🍓", "🍍", "🍎", "🍏", "🍌"];

function getRandomEmoji() {
  const randomIndex = Math.floor(Math.random() * emojiList.length);
  return emojiList[randomIndex];
}

module.exports = {
  data: new SlashCommandBuilder().setName("slot").setDescription("tocky tocky"),
  async execute(interaction) {
    const slotResults = [getRandomEmoji(), getRandomEmoji(), getRandomEmoji()];

    const isWin = slotResults.every((emoji) => emoji === slotResults[0]);

    const resultMessage = `🎰 **vysledek:** ${slotResults.join(" ")} 🎰\n\n${
      isWin ? "Ses dobrej, vyhrals" : "ty pico zkurvena, prohrals"
    }`;

    await interaction.reply(resultMessage);
  },
};
