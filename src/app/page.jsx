'use client'

import { useEffect, useState } from 'react'
import Character from '@/components/Character.jsx'
import Characters from '@/components/Characters.jsx'
import Header from '@/components/Header.jsx'
import TierList from '@/components/TierList.jsx'
import WS from '@/components/ws.js'
import { initCharacters } from '@/utils/helpers.js'

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Component                                                                                     │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

export default function Home() {
  const ws = WS()
  const [characters, setCharacters] = useState([])
  const [uuid, setUUID] = useState()

  useEffect(() => {
    setStore(initCharacters())
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
