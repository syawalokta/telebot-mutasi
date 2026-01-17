import { Telegraf } from 'telegraf'
import { config } from './config.js'

import ownerTestConn from './plugins/owner-testconn.js'
import autoMutasi from './plugins/auto-mutasi.js'
import ownerRekapSaldo from './plugins/owner-rekapsaldo.js'

const bot = new Telegraf(config.token)

// plugins
ownerTestConn(bot, config)
autoMutasi(bot, config)
ownerTestConn(bot, config)
autoMutasi(bot, config)
ownerRekapSaldo(bot, config)

// start
bot.launch()
console.log(`${config.botname} auto mutasi aktif...`)

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))