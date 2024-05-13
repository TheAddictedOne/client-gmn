'use client'

import { useEffect, useState } from 'react'
import css from '@/app/ranking/Ranking.module.css'
import { getImage, getItem } from '@/utils/helpers.js'
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
  if (name === 'oceane') return '/oce.png'
  if (name === 'david-qa') return '/david-qa.png'
  return '/happycry.png'
}

const Page = () => {
  const [loading, setLoading] = useState(true)
  const [characters, setCharacters] = useState([])
  const [scores, setScores] = useState([])
  const [points, setPoints] = useState({})
  const [bonus, setBonus] = useState([])

  useEffect(() => {
    fetch('/api/scores/formatted')
      .then((data) => data.json())
      .then((json) => {
        setLoading(false)
        setCharacters(json.characters)
        setScores(json.scores)
        setPoints(json.points)
        setBonus(json.bonus)
      })
  }, [])

  if (loading) {
    return (
      <div className={css.Centered}>
        <Image src="/loading.gif" width={900} height={600} alt="" />
      </div>
    )
  }

  return (
    <div className={css.Ranking}>
      <header className={css.Box}>
        <h1 className={css.Title}>Classement</h1>
        <table>
          <thead>
            <tr>
              <td>Rang</td>
              <td>Nom</td>
              <td title="Fort probable">Total de A ({points.A} points)</td>
              <td title="Envisageable">Total de B ({points.B} points)</td>
              <td title="Mouais">Total de C ({points.C} points)</td>
              <td title="Hors de question !">Total de D ({points.D} points)</td>
              <td>Bonus</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, i) => {
              return (
                <>
                  <tr key={i} data-ranking={i}>
                    <td className={css.Emoji}>
                      <Image
                        src={getEmoji(i, score.name.toLowerCase())}
                        width={128}
                        height={128}
                        alt=""
                      />
                    </td>
                    <td>{score.name}</td>
                    <td>
                      <div>{score.totalA * points.A}</div>
                      <div className={css.Small}>{score.totalA} / 14</div>
                    </td>
                    <td>
                      <div>{score.totalB * points.B}</div>
                      <div className={css.Small}>{score.totalB} / 11</div>
                    </td>
                    <td>
                      <div>{score.totalC * points.C}</div>
                      <div className={css.Small}>{score.totalC} / 21</div>
                    </td>
                    <td>
                      <div>{score.totalD * points.D}</div>
                      <div className={css.Small}>{score.totalD} / 25</div>
                    </td>
                    <td>{score.bonus}</td>
                    <td>{score.total} points</td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
      </header>
      <section className={css.Box}>
        <h1 className={css.Title}>Bonus</h1>
        {bonus.map((b, i) => {
          return (
            <div key={i} className={css.Multiplier}>
              <div className={css.MultiplierImage} title={b.name}>
                <Image src={getImage(b.name)} width={400} height={400} alt="" />
              </div>
              <div>
                {b.points} points ({b.why})
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default Page
