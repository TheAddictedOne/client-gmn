'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [tierLists, setTierLists] = useState({})

  // useEffect(initWS, [tierLists])

  // Render ----------------------------------------------------------------------------------------

  return (
    <>
      {Object.entries(tierLists).map(([uuid, tierList]) => {
        return (
          <section key={uuid}>
            <h1>{uuid}</h1>
            {tierList.s.map((s, i) => (
              <article key={i}>
                <img src={s.image} />
              </article>
            ))}
          </section>
        )
      })}
    </>
  )

  // Utils -----------------------------------------------------------------------------------------

  function initWS() {
    setInterval(() => {
      console.log(tierLists)
    }, 2000)
    const ws = new WebSocket('ws://localhost:8081')
    const on = {
      ping: () => {
        ws.send(JSON.stringify({ cmd: 'listen' }))
      },
      listen: () => {},
      update: ({ uuid, old, tierList }) => {
        const newTierLists = {}
        Object.entries(old).map(([id, tl]) => {
          newTierLists[id] = { ...tl }
        })
        newTierLists[uuid] = tierList
        setTierLists(newTierLists)
      }
    }

    ws.addEventListener('open', () => {
      console.log('WS opened')
      ws.send(JSON.stringify({ cmd: 'ping' }))
    })  
    
    ws.addEventListener('message', ({ data }) => {
      try {
        const { response, uuid, tierList } = JSON.parse(data)
        on[response]({ uuid, old: tierLists, tierList })
      }
      catch (error) {
        console.error(error)
      }
    })
    
    ws.addEventListener('close', () => console.log('↑ Closed'))
  }
}
