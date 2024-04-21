const URL = 'ws://localhost:8081'

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Component                                                                                     │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

export default function WS() {
  // ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
  // │                                                                                             │
  // │ Commands sent to server                                                                     │
  // │                                                                                             │
  // └─────────────────────────────────────────────────────────────────────────────────────────────┘

  function sendPing() {
    if (ws.readyState !== 1) return
    ws.send(JSON.stringify({ cmd: 'ping' }))
  }

  function sendUpdate({ uuid, tierList }: { uuid: string; tierList: Character[] }) {
    if (ws.readyState !== 1) return
    ws.send(JSON.stringify({ cmd: 'update', uuid, tierList }))
  }

  // ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
  // │                                                                                             │
  // │ Listeners                                                                                   │
  // │                                                                                             │
  // └─────────────────────────────────────────────────────────────────────────────────────────────┘

  function onConnectionOpened() {
    console.log('Connection opened')
    sendPing()
  }

  function onMessageReceived({ data }: MessageEvent) {
    try {
      const json = JSON.parse(data)
      if (!json.response) {
        throw new Error('Unexpected format')
      }
      if (json.response === 'ping') {
        console.log('Ping')
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

  return { sendPing, sendUpdate }
}
