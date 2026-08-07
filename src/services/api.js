const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://api.kolektix.com/').replace(/\/+$/, '')
const EVENT_SLUG = import.meta.env.VITE_EVENT_SLUG || 'rooted-relevant-creative-r2c27'

const toEndpoint = (path) => {
  return `${API_BASE_URL}/${path.replace(/^\/+/, '')}`
}

export async function getEvent() {
  const res = await fetch(toEndpoint(`/api/event/${EVENT_SLUG}`), {
    headers: { Accept: 'application/json' }
  })
  if (!res.ok) {
    throw new Error(`Gagal memuat data event (${res.status})`)
  }
  const json = await res.json()
  return json.data
}

export async function createTransaction(payload) {
  const res = await fetch(toEndpoint('api/transaction-without-auth'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload)
  })
  const json = await res.json()
  if (!res.ok) {
    const msg = json?.message || `Transaksi gagal (${res.status})`
    throw new Error(msg)
  }
  return json
}