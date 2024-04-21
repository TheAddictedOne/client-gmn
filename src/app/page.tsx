'use client'

import { useEffect, useState } from 'react'
import Character from '@/components/Character.tsx'
import Characters from '@/components/Characters.tsx'
import Header from '@/components/Header.tsx'
import TierList from '@/components/TierList.tsx'
import WS from '@/components/ws.ts'
import { init } from '@/app/helpers.ts'

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Runtime                                                                                       │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

const uuid = window.crypto.randomUUID()
const ws = WS()

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Component                                                                                     │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

export default function Home() {
  const [store, setStore] = useState(init())

  useEffect(() => {
    const data = JSON.stringify(store)
    window.localStorage.setItem('store', data)
    ws.sendUpdate({ uuid, tierList: store })
  }, [store])

  return (
    store && (
      <>
        <Header {...{ uuid }} />
        <TierList {...{ store, setStore }} />
        <Characters>
          {store
            .filter((character) => character.tier === 'NONE')
            .map((character, i) => {
              return <Character key={i} {...{ store, setStore, character }} />
            })}
        </Characters>
      </>
    )
  )
}
