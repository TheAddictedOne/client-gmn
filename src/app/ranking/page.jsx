'use client'

import { useEffect, useState } from 'react'
import css from '@/app/ranking/Ranking.module.css'
import { getImage } from '@/utils/helpers.js'
import Image from 'next/image'

function getEmoji(i, name) {
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

const Page = () => {
  const [users, setUsers] = useState([])
  const [characters, setCharacters] = useState([])
  const [multipliers, setMultipliers] = useState([])
  const [points, setPoints] = useState([])

  useEffect(() => {
    fetch('/api/scores/formatted')
      .then((data) => data.json())
      .then((json) => {
        setUsers(json.users)
        setCharacters(json.characters)
        setMultipliers(json.multipliers)
        setPoints(json.points)
      })
  }, [])

  return (
    <>
      <header className={css.Box}>
        <h1 className={css.Title}>Classement</h1>
        <ul className={css.List}>
          {users.map(({ name, score }, i) => {
            return (
              <li key={i} data-ranking={i} className={css.ListItem}>
                <div className={css.Emoji}>
                  <Image src={getEmoji(i, name.toLowerCase())} width={128} height={128} alt="" />
                </div>
                <div>{name}</div>
                <div>{score} points</div>
              </li>
            )
          })}
        </ul>
      </header>

      <section className={css.Box}>
        <h1 className={css.Title}>Multiplicateurs</h1>
        {multipliers.map((multiplier, i) => {
          return (
            <div key={i} className={css.Multiplier}>
              <div className={css.MultiplierImage} title={multiplier.name}>
                <Image src={getImage(multiplier.name)} width={400} height={400} alt="" />
              </div>
              <div>
                Multiplicateur x{multiplier.multiplier} ({multiplier.why})
              </div>
            </div>
          )
        })}
      </section>

      <section className={css.Box}>
        <h1 className={css.Title}>Points en fonction du classement</h1>
        <table className={css.Table}>
          <thead>
            <tr>
              <td>Tier</td>
              <td>Tier A</td>
              <td>Tier B</td>
              <td>Tier C</td>
              <td>Tier D</td>
            </tr>
          </thead>
          <tbody>
            {points.map((p, i) => {
              return (
                <tr key={i}>
                  <td title={p.name}>{p.name}</td>
                  <td>{p.A}</td>
                  <td>{p.B}</td>
                  <td>{p.C}</td>
                  <td>{p.D}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Page
