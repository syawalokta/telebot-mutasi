import { getLastMutasi } from '../lib/mutasi.js'
import { sendToChannel } from '../lib/channel.js'

export default function ownerTestConn(bot, config) {
  bot.command('testconn', async (ctx) => {
    try {
      // OWNER ONLY
      if (!config.ownerid.includes(String(ctx.from.id))) return

      // cek channel config
      const channel = config.channel[0]
      if (!channel) {
        return ctx.reply('❌ Channel belum di settings')
      }

      // ambil mutasi terakhir
      const last = await getLastMutasi(config)
      if (!last) {
        return ctx.reply('⚠️ Tidak ada data mutasi')
      }

      const text = `
💰 *SALDO MASUK (TEST)*

🏦 Brand : ${last.brand.name}
📌 Status : ${last.status}
💳 Kredit : Rp ${last.kredit}
💸 Debet : Rp ${last.debet}

📝 Keterangan :
${last.keterangan}

📅 Tanggal : ${last.tanggal}
💼 Saldo Akhir : ${last.saldo_akhir}
      `

      // kirim ke channel
      const sent = await sendToChannel(bot, channel, text)
      if (!sent) {
        return ctx.reply('❌ Gagal kirim ke channel (bot belum admin?)')
      }

      // konfirmasi ke owner
      await ctx.reply('✅ Mutasi terakhir berhasil dikirim ke channel')

    } catch (err) {
      console.error(err)
      ctx.reply('❌ Terjadi kesalahan')
    }
  })
}