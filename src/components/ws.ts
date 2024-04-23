import { formatLeaderboard } from '@/utils/helpers.ts'

const URL = 'ws://localhost:8081'

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Component                                                                                     │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

export default function WS(
  tierLists: ServerTierList[] = [],
  setTierLists: Function = () => {},
  tosub = false
) {
  console.log('init')
  let isSub = false

  // ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
  // │                                                                                             │
  // │ Commands sent to server                                                                     │
  // │                                                                                             │
  // └─────────────────────────────────────────────────────────────────────────────────────────────┘

  function sendPing() {
    if (ws.readyState !== 1) return
    ws.send(JSON.stringify({ cmd: 'ping' }))
  }

  function sendUpdate({ uuid, characters }: { uuid: string; characters: Character[] }) {
    if (ws.readyState !== 1) return
    ws.send(JSON.stringify({ cmd: 'update', uuid, characters }))
  }

  function sendSubscribe() {
    if (ws.readyState !== 1) return
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

  function onMessageReceived({ data }: MessageEvent) {
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
        isSub = true
        return
      }
      if (json.response === 'player_update') {
        if (!isSub) return
        console.log('< player_update', json)
        const oneTierList: ServerTierList = {
          uuid: json.uuid,
          characters: json.characters,
        }
        const newTierLists = formatLeaderboard(tierLists, oneTierList)
        setTierLists(newTierLists)
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

  const ws = new WebSocket('ws://localhost:8081')

  ws.addEventListener('open', onConnectionOpened)
  ws.addEventListener('message', onMessageReceived)
  ws.addEventListener('close', onConnectionClosed)

  return { sendPing, sendUpdate, sendSubscribe }
}
