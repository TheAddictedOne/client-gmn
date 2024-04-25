'use client'

import { useEffect, useState } from 'react'
import Character from '@/components/Character.tsx'
import Characters from '@/components/Characters.tsx'
import Header from '@/components/Header.tsx'
import TierList from '@/components/TierList.tsx'
import WS from '@/components/ws.ts'
import { init } from '@/utils/helpers.ts'

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Component                                                                                     │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

export default function Home() {
  const [store, setStore] = useState()
  const [ws, setWS] = useState()
  const [uuid, setUUID] = useState()

  useEffect(() => {
    setStore(init())
    setWS(WS())
    setUUID(window.crypto.randomUUID())
  }, [])

  useEffect(() => {
    if (!store) return
    const data = JSON.stringify(store)
    window.localStorage.setItem('store', data)
    ws.sendUpdate({ uuid, characters: store })
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
