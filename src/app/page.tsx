'use client'

import Header from '@/components/Header.jsx'
import TierList from '@/components/TierList.jsx'
import Character from '@/components/Character.jsx'
import css from '@/components/Characters.module.css'
import { useEffect,  useState } from 'react'
import list from '@/app/data.json'

function initStore() {
  if (window.localStorage.length) {
    return JSON.parse(window.localStorage.getItem('store'))
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

  function add(slug, tier) {
    const newStore = { ...store }
    for (const key of Object.keys(newStore)) {
      newStore[key] = newStore[key].filter((character) => character.slug !== slug)
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
      <section className={css.Characters}>
        {store.listOfCharacters.map((character, i) => {
          return <Character key={i} {...{ ...character, add } } />
        })}
      </section>
    </>
  )
}
