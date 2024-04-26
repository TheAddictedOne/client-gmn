'use client'

import { useEffect, useState } from 'react'
import WS from '@/components/ws.js'
import css from '@/components/Leaderboard.module.css'
import { getImage } from '@/utils/helpers.js'

const ws = WS(true)

const Page = () => {
  const [characters, setCharacters] = useState([])
  ws.setCallback(setCharacters)

  return (
    <main className={css.Main}>
      {characters.map((character, i) => {
        const style = {
          width: `${character.points * 3}0px`,
        }

        return (
          <section className={css.Section} key={i}>
            <div className={css.Score} {...{ style }}>
              {character.points}
            </div>
            <div className={css.Image}>
              <img src={getImage(character.name)} />
            </div>
          </section>
        )
      })}
    </main>
  )
}

export default Page
