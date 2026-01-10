import axios from 'axios'

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

  // selalu return array 
  return Array.isArray(list) ? list : []
}