import { getAllMutasi } from '../lib/mutasi.js'
import { loadDB, saveDB } from '../lib/database.js'
import { sendToChannel } from '../lib/channel.js'

export default function autoMutasi(bot, config) {
  const INTERVAL = 20 * 1000

  async function run() {
    try {
      const channel = config.channel[0]
      if (!channel) return

      const db = loadDB()
      const list = await getAllMutasi(config)
      if (!list.length) return

      list.sort((a, b) => a.id - b.id)

      for (const trx of list) {
        if (trx.id <= db.last_id) continue

        db.last_id = trx.id
        db.data.push(trx)
        saveDB(db)

        const isIn = trx.status === 'IN'

        const text = isIn ? `
*SALDO MASUK*

🏦 Brand : ${trx.brand.name}
💳 Jumlah : Rp ${trx.kredit}

📝 ${trx.keterangan}
📅 ${trx.tanggal}
💼 Total Saldo : ${trx.saldo_akhir}
        ` : `
 *SALDO KELUAR*

🏦 Brand : ${trx.brand.name}
💳 Jumlah : Rp ${trx.debet}

📝 ${trx.keterangan}
📅 ${trx.tanggal}
💼 Total saldo : ${trx.saldo_akhir}
        `

        await sendToChannel(bot, channel, text)
        console.log(`Mutasi ${trx.status}:`, trx.id)
      }

    } catch (err) {
      console.error('AUTO MUTASI ERROR:', err.message)
    }
  }

  run()
  setInterval(run, INTERVAL)
}