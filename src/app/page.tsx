'use client'

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Import                                                                                        │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

import { useEffect,  useState } from 'react'
import names from '@/app/names.json'
import Character from '@/components/Character.jsx'
import Characters from '@/components/Characters.tsx'
import Header from '@/components/Header.jsx'
import TierList from '@/components/TierList.jsx'
import WS from '@/components/ws.ts'

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Helpers                                                                                       │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

export function initFromScratch(names : string[]) {
  const characters = names.map((name) => {
    name = name.toLowerCase()
    const slug = name.replaceAll(' ', '-')
    const image = `/${slug}.webp`
    return { name, slug, image }
  })
  
  const store = {
    s: [],
    a: [],
    b: [],
    c: [],
    characters,
  }

  return store
}

function init() {
  const store = window.localStorage.getItem('store')
  try {
    return store ? JSON.parse(store) : initFromScratch(names)
  }
  catch (error) {
    console.warn(error)
    return initFromScratch(names)
  }
}

export function move(store:Store, slug:string, tier:string) {
  const newStore = { ...store }
  for (const key of Object.keys(newStore)) {
    newStore[key] = newStore[key].filter((character:Character) => character.slug !== slug)
  }
  newStore[tier].push({
    name: slug.replaceAll('-', ' '),
    slug,
    image: `/${slug}.webp`
  })
  return newStore
}

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

  function add(slug:string, tier:string) {
    const newStore = { ...store }
    for (const key of Object.keys(newStore)) {
      newStore[key] = newStore[key].filter((character:Character) => character.slug !== slug)
    }
    newStore[tier].push({
      name: slug.replaceAll('-', ' '),
      slug,
      image: `/${slug}.webp`
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
      <Header {...{ uuid } } />
      <TierList {...{ store, add } } />
      <Characters>
        {store.listOfCharacters.map((character:Character, i:number) => {
          return <Character key={i} {...{ ...character, add } } />
        })}
      </Characters>
    </>
  )
}
