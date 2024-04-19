'use client'

import { useEffect,  useState } from 'react'
import list from '@/app/data.json'
import Character from '@/components/Character.jsx'
import Characters from '@/components/Characters.tsx'
import Header from '@/components/Header.jsx'
import TierList from '@/components/TierList.jsx'

function initStore() {
  if (window.localStorage.length) {
    return JSON.parse(window.localStorage.getItem('store') || '')
  }

  const listOfCharacters = list.map((character) => {
    const name = character.name.toLowerCase()
    const slug = name.replaceAll(' ', '-')
    const image = `/${slug}.webp`
    return { name, slug, image }
  })
  
  const store = {
    s: [],
    a: [],
    b: [],
    c: [],
    listOfCharacters,
  }

  window.localStorage.setItem('store', JSON.stringify(store))

  return store
}

export default function Home() {
  const [uuid] = useState(window.crypto.randomUUID())
  const [ws] = useState(new WebSocket('ws://localhost:8081'))
  const [store, setStore] = useState(initStore())

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
    ws.addEventListener('open', () => {
      console.log('↑ WS opened')
      ws.send(JSON.stringify({ cmd: 'ping' }))
    })
  
    ws.addEventListener('message', ({ data }) => {
      const json = JSON.parse(data)
      if (!json.response) return
  
      switch (json.response) {
        case 'ping':
          console.log('↑ connected')
          break
  
        default:
          break
      }
    })
  
    ws.addEventListener('close', () => console.log('↑ WS closed'))
  }, [])

  useEffect(() => {
    const data = JSON.stringify(store)
    window.localStorage.setItem('store', data)
    setTimeout(() => {
      ws.send(JSON.stringify({ cmd: 'update', uuid, tierList: store }))
    }, 500)
  }, [store, uuid, ws])

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
