import { formatLeaderboard } from '@/utils/helpers.js'

const URL = 'wss://server-gmn.glitch.me/'

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Component                                                                                     │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

export default function WS(tosub = false) {
  let store = []
  let callback = () => {}

  if (typeof window === 'undefined') {
    return {
      setCallback: () => {},
      sendPing: () => {},
      sendUpdate: () => {},
      sendSubscribe: () => {},
    }
  }

  function setCallback(cb) {
    callback = cb
  }

  function updateStore(payload) {
    const uuids = store.map((current) => current.uuid)
    if (uuids.includes(payload.uuid)) {
      return store.map((current) => {
        return current.uuid === payload.uuid ? payload : current
      })
    }

    return [...store, payload]
  }

  function reorder() {
    const result = {}

    store.forEach((payload) => {
      payload.A.forEach((name) => {
        if (result[name]) {
          result[name] += 4
        } else {
          result[name] = 4
        }
      })
      payload.B.forEach((name) => {
        if (result[name]) {
          result[name] += 3
        } else {
          result[name] = 3
        }
      })
      payload.C.forEach((name) => {
        if (result[name]) {
          result[name] += 2
        } else {
          result[name] = 2
        }
      })
      payload.D.forEach((name) => {
        if (result[name]) {
          result[name] += 1
        } else {
          result[name] = 1
        }
      })
    })

    return Object.entries(result).map(([name, points]) => {
      return { name, points }
    })
  }

  // ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
  // │                                                                                             │
  // │ Commands sent to server                                                                     │
  // │                                                                                             │
  // └─────────────────────────────────────────────────────────────────────────────────────────────┘

  function sendPing() {
    if (ws.readyState !== 1) return
    console.log('> ping')
    ws.send(JSON.stringify({ cmd: 'ping' }))
  }

  function sendUpdate(payload) {
    if (ws.readyState !== 1) return
    console.log('> update')
    ws.send(JSON.stringify({ cmd: 'update', payload }))
  }

  function sendSubscribe() {
    if (ws.readyState !== 1) return
    console.log('> subscribe')
    ws.send(JSON.stringify({ cmd: 'subscribe' }))
  }

  // ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
  // │                                                                                             │
  // │ Listeners                                                                                   │
  // │                                                                                             │
  // └─────────────────────────────────────────────────────────────────────────────────────────────┘

  function onConnectionOpened() {
    console.log('Connection opened')
    tosub ? sendSubscribe() : sendPing()
  }

  function onMessageReceived({ data }) {
    try {
      const json = JSON.parse(data)
      if (!json.response) {
        throw new Error('< Unexpected format')
      }
      if (json.response === 'ping') {
        console.log('< ping')
        return
      }
      if (json.response === 'subscribe') {
        console.log('< subscribe')
        return
      }
      if (json.response === 'player_update') {
        if (!tosub) return
        console.log('< player_update', json)
        store = updateStore(json.payload)
        console.log('new store', store)
        const chars = reorder(store)
        console.log('chars', chars)
        callback(chars)
      }
    } catch (error) {
      console.warn(error)
    }
  }

  function onConnectionClosed() {
    console.log('Connection closed')
  }

  // ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
  // │                                                                                             │
  // │ Runtime                                                                                     │
  // │                                                                                             │
  // └─────────────────────────────────────────────────────────────────────────────────────────────┘

  const ws = new WebSocket(URL)

  ws.addEventListener('open', onConnectionOpened)
  ws.addEventListener('message', onMessageReceived)
  ws.addEventListener('close', onConnectionClosed)

  return { setCallback, sendPing, sendUpdate, sendSubscribe }
}
