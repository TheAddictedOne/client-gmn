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
  const [uuid, setUUID] = useState('')

  useEffect(() => {
    setCharacters(initCharacters())
    setUUID(window.crypto.randomUUID())
  }, [])

  useEffect(() => {
    if (!characters) return
    window.localStorage.setItem('characters', JSON.stringify(characters))
    ws.sendUpdate({ uuid, characters })
  }, [characters])

  return (
    characters && (
      <>
        <Header {...{ uuid }} />
        <TierList {...{ characters, setCharacters }} />
        <Characters>
          {characters
            .filter((character) => character.tier === 'NONE')
            .map((character, i) => {
              return <Character key={i} {...{ characters, setCharacters, character }} />
            })}
        </Characters>
      </>
    )
  )
}
