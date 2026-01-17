import { getRekapSaldoMasuk } from '../lib/mutasi.js'

export default function ownerRekapSaldo(bot, config) {
  bot.command('rekapsaldo', async (ctx) => {
    try {
      // owner only
      if (!config.ownerid.includes(String(ctx.from.id))) return

      await ctx.reply('📊 Menghitung total saldo masuk...')

      const total = await getRekapSaldoMasuk(config)

      if (!total) {
        return ctx.reply('⚠️ Tidak ada saldo masuk')
      }

      const format = total.toLocaleString('id-ID')

      const text = `
📊 *REKAP SALDO MASUK*

💰 Total Saldo Masuk :
Rp ${format}
      `

      await ctx.reply(text, { parse_mode: 'Markdown' })

    } catch (err) {
      console.error(err)
      ctx.reply('❌ Gagal menghitung rekap saldo')
    }
  })
}