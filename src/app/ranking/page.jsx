'use client'

import { useEffect, useState } from 'react'
import css from '@/app/ranking/Ranking.module.css'
import { getImage } from '@/utils/helpers.js'
import Image from 'next/image'

const Page = () => {
  const [users, setUsers] = useState([])
  const [characters, setCharacters] = useState([])
  useEffect(() => {
    fetch('/api/scores/formatted')
      .then((data) => data.json())
      .then((json) => {
        setUsers(json.users)
        setCharacters(json.characters)
      })
  }, [])

  const getEmoji = (i, name) => {
    if (i === 0) return '/platinum.png'
    if (i === 1) return '/gold.png'
    if (i === 2) return '/silver.png'
    if (i === 3) return '/bronze.png'
    if (name === 'clem') return '/clem.jpg'
    if (name === 'johan p') return '/jojo.jpg'
    if (name === 'jérémy') return '/jeje.png'
    if (name === 'fra') return '/fra.png'
    if (name === 'cycymomo') return '/cycy.gif'
    if (name === 'judith') return '/judith.png'
    if (name === 'yoyo') return '/yoyo.gif'
    if (name === 'oce') return '/oce.png'
    return '/happycry.png'
  }

  return (
    <>
      <header className={css.Header}>
        <h1 className={css.HeaderTitle}>Classement</h1>
        <ul className={css.HeaderList}>
          {users.map(({ name, score }, i) => {
            return (
              <li key={i} data-ranking={i} className={css.HeaderListItem}>
                <div className={css.HeaderListItemEmoji}>
                  <Image src={getEmoji(i, name.toLowerCase())} width={128} height={128} alt="" />
                </div>
                <div>{name}</div>
                <div>{score} points</div>
              </li>
            )
          })}
        </ul>
      </header>
      <section className={css.Details}>
        <div className={css.Header}>
          <div className={css.Name}>Name</div>
          <div className={css.A}>A</div>
          <div className={css.B}>B</div>
          <div className={css.C}>C</div>
          <div className={css.D}>D</div>
        </div>
        {characters.map((character, i) => {
          return (
            <div key={i} className={css.Row}>
              <img src={getImage(character.name)} />
              <div>{character.A}</div>
              <div>{character.B}</div>
              <div>{character.C}</div>
              <div>{character.D}</div>
            </div>
          )
        })}
      </section>
    </>
  )
}

export default Page
