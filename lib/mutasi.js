import axios from 'axios'

// HELPER PARSE NOMINAL
function parseNominal(value) {
  return Number(String(value).replace(/\./g, '')) || 0
}

// AMBIL MUTASI TERAKHIR
export async function getLastMutasi(config) {
  const url = `${config.APIs.oktodev}/orderkuota/mutasiqr`
  const params = {
    apikey: config.OrderKuota.apikey,
    username: config.OrderKuota.username,
    token: config.OrderKuota.api_token
  }

  const res = await axios.get(url, { params })

  let list = []

  if (Array.isArray(res.data)) {
    list = res.data
  } else if (Array.isArray(res.data?.data)) {
    list = res.data.data
  } else if (Array.isArray(res.data?.result)) {
    list = res.data.result
  }

  if (!list.length) return null

  // mutasi paling baru
  return list.sort((a, b) => b.id - a.id)[0]
}

// AMBIL SEMUA MUTASI
export async function getAllMutasi(config) {
  const url = `${config.APIs.oktodev}/orderkuota/mutasiqr`
  const params = {
    apikey: config.OrderKuota.apikey,
    username: config.OrderKuota.username,
    token: config.OrderKuota.api_token
  }

  const res = await axios.get(url, { params })

  let list = []

  if (Array.isArray(res.data)) {
    list = res.data
  } else if (Array.isArray(res.data?.data)) {
    list = res.data.data
  } else if (Array.isArray(res.data?.result)) {
    list = res.data.result
  }

  return Array.isArray(list) ? list : []
}

// REKAP SALDO MASUK (IN)
export async function getRekapSaldoMasuk(config) {
  const list = await getAllMutasi(config)
  if (!list.length) return 0

  let total = 0

  for (const trx of list) {
    if (trx.status === 'IN') {
      total += parseNominal(trx.kredit)
    }
  }

  return total
}

// REKAP SALDO KELUAR (OUT)
export async function getRekapSaldoKeluar(config) {
  const list = await getAllMutasi(config)
  if (!list.length) return 0

  let total = 0

  for (const trx of list) {
    if (trx.status === 'OUT') {
      total += parseNominal(trx.debet)
    }
  }

  return total
}

// REKAP TRANSPARAN (IN + OUT)
export async function getRekapSaldoTransparan(config) {
  const list = await getAllMutasi(config)

  let masuk = 0
  let keluar = 0
  let countIn = 0
  let countOut = 0

  for (const trx of list) {
    if (trx.status === 'IN') {
      masuk += parseNominal(trx.kredit)
      countIn++
    } else if (trx.status === 'OUT') {
      keluar += parseNominal(trx.debet)
      countOut++
    }
  }

  return {
    masuk,
    keluar,
    countIn,
    countOut,
    saldoBersih: masuk - keluar
  }
}