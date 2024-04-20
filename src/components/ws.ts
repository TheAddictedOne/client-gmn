const URL = 'ws://localhost:8081'

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Component                                                                                     │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

export default function WS() : WebSocket {

  // ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
  // │                                                                                             │
  // │ Commands sent to server                                                                     │
  // │                                                                                             │
  // └─────────────────────────────────────────────────────────────────────────────────────────────┘

  function pingToServer() {
    ws.send(JSON.stringify({ cmd: 'ping' }))
  }

  // ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
  // │                                                                                             │
  // │ Commands received from server                                                               │
  // │                                                                                             │
  // └─────────────────────────────────────────────────────────────────────────────────────────────┘

  const commands = {
    ping: () => console.log('Ping')
  }

  // ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
  // │                                                                                             │
  // │ Listeners                                                                                   │
  // │                                                                                             │
  // └─────────────────────────────────────────────────────────────────────────────────────────────┘

  function onConnectionOpened() {
    console.log('Connection opened')
    pingToServer()
  }

  function onMessageReceived({ data }) {
    try {
      const json = JSON.parse(data)
      if (!json.response) {
        throw new Error('Unexpected format')
      }
      commands[json.response](json.params)
    }
    catch (error) {
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

  return ws
}



