import { getAllMutasi } from '../lib/mutasi.js'
import { loadDB, saveDB } from '../lib/database.js'
import { sendToChannel } from '../lib/channel.js'

export default function autoMutasi(bot, config) {
  const INTERVAL = 20 * 1000 // 20 detik

  async function run() {
    try {
      const channel = config.channel[0]
      if (!channel) return

      const db = loadDB()
      const list = await getAllMutasi(config)

      if (!Array.isArray(list) || !list.length) return

      // urutkan lama → baru
      list.sort((a, b) => a.id - b.id)

      for (const trx of list) {
        // hanya mutasi BARU & IN
        if (trx.id > db.last_id && trx.status === 'IN') {
          db.last_id = trx.id
          db.data.push(trx)
          saveDB(db)

          const text = `
💰 *SALDO MASUK*

🏦 Brand : ${trx.brand.name}
💳 Jumlah : Rp ${trx.kredit}

📝 Keterangan :
${trx.keterangan}

📅 Tanggal : ${trx.tanggal}
💼 Saldo Akhir : ${trx.saldo_akhir}
          `

          await sendToChannel(bot, channel, text)
          console.log('Mutasi baru dikirim:', trx.id)
        }
      }

    } catch (err) {
      console.error('AUTO MUTASI ERROR:', err.message)
    }
  }

  // jalan pertama kali
  run()

  // interval
  setInterval(run, INTERVAL)
}