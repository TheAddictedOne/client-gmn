'use client'

import { useEffect, useState } from 'react'
import Character from '@/components/Character.jsx'
import Characters from '@/components/Characters.tsx'
import Header from '@/components/Header.jsx'
import TierList from '@/components/TierList.jsx'
import WS from '@/components/ws.ts'
import { init, move } from '@/app/helpers.ts'

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Runtime                                                                                       │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

const ws = WS()

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Component                                                                                     │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

export default function Home() {
  const [uuid] = useState(window.crypto.randomUUID())
  const [store, setStore] = useState(init())

  function add(slug: string, tier: string) {
    const newStore = { ...store }
    for (const key of Object.keys(newStore)) {
      newStore[key] = newStore[key].filter((character: Character) => character.slug !== slug)
    }
    newStore[tier].push({
      name: slug.replaceAll('-', ' '),
      slug,
      image: `/${slug}.webp`,
    })
    setStore(newStore)
  }

  useEffect(() => {
    const data = JSON.stringify(store)
    window.localStorage.setItem('store', data)
    setTimeout(() => {
      ws.send(JSON.stringify({ cmd: 'update', uuid, tierList: store }))
    }, 500)
  }, [store, uuid])

  return (
    <>
      <Header {...{ uuid }} />
      <TierList {...{ store, move }} />
      <Characters>
        {store.listOfCharacters.map((character: Character, i: number) => {
          return <Character key={i} {...{ ...character, move }} />
        })}
      </Characters>
    </>
  )
}
