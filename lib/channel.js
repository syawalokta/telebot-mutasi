export async function sendToChannel(bot, channel, text) {
  try {
    await bot.telegram.sendMessage(channel, text, {
      parse_mode: 'Markdown'
    })
    return true
  } catch {
    return false
  }
}