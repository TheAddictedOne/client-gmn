'use client'

import { useEffect, useState } from 'react'
import WS from '@/components/ws.ts'

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Runtime                                                                                       │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Component                                                                                     │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

export default function Home() {
  const [tierLists, setTierLists]: [ServerTierList[], Function] = useState([])
  const ws = WS(tierLists, setTierLists, true)
  ws.sendSubscribe()

  return (
    <>
      {tierLists.map((tierList) => {
        return (
          <section key={tierList.uuid}>
            <h1>{tierList.uuid}</h1>
            {tierList.characters.map((character, i) => (
              <article key={i}>
                {character.tier === 'A' && <img src={character.image} alt="" />}
              </article>
            ))}
          </section>
        )
      })}
    </>
  )
}
