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
  if (name === 'lucie') return '/lucie.png'
  return '/happycry.png'
}

const Page = () => {
  const [loading, setLoading] = useState(true)
  const [defaultChars, setDefaultChars] = useState([])
  const [characters, setCharacters] = useState([])
  const [scores, setScores] = useState([])
  const [points, setPoints] = useState({})
  const [bonus, setBonus] = useState([])

  useEffect(() => {
    fetch('/api/scores/formatted')
      .then((data) => data.json())
      .then((json) => {
        setLoading(false)
        setDefaultChars(json.characters)
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
        <h1
          className={[css.Title, css.Clickable].join(' ')}
          onClick={() => setCharacters(defaultChars)}
        >
          Classement (cliquable pour voir notre tierlist)
        </h1>
        <table>
          <thead>
            <tr>
              <td>Rang</td>
              <td>
                <div>Nom</div>
                <div>(cliquable pour voir la tierlist)</div>
              </td>
              <td title="Fort probable">
                <div>Total de A</div>
                <div>({points.A} points)</div>
              </td>
              <td title="Envisageable">
                <div>Total de B</div>
                <div>({points.B} points)</div>
              </td>
              <td title="Mouais">
                <div>Total de C</div>
                <div>({points.C} points)</div>
              </td>
              <td title="Hors de question !">
                <div>Total de D</div>
                <div>({points.D} points)</div>
              </td>
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
                        unoptimized
                      />
                    </td>
                    <td onClick={() => setCharacters(score.characters)} className={css.Clickable}>
                      {score.name}
                    </td>
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
        <h1 className={css.Title}>TierList</h1>
        {['Fort probable', 'Envisageable', 'Mouais', 'Hors de question !'].map((category, key) => {
          return (
            <div className={css.Tier} key={key}>
              <div title={category} className={css.TierTitle}>
                {category}
              </div>
              {characters
                .filter((c) => c.rank === category)
                .map((c, i) => {
                  const good = defaultChars.find((char) => c.name === char.name)
                  const className =
                    good.rank === category
                      ? [css.TierImage, css.Green].join(' ')
                      : [css.TierImage, css.Red].join(' ')
                  return (
                    <div key={i} className={className} title={c.name}>
                      <img src={getImage(c.name)} />
                    </div>
                  )
                })}
            </div>
          )
        })}
      </section>

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
