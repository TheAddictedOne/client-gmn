'use client'

import names from '@/utils/names.json'
import { useEffect, useState } from 'react'
import WS from '@/components/ws.js'
import css from '@/components/Leaderboard.module.css'

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Runtime                                                                                       │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

// const characters = initFromScratch(names).map((character) => {
//   const points = Math.floor(Math.random() * 100)
//   return {
//     ...character,
//     points,
//   }
// })

// ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                                                                               │
// │ Component                                                                                     │
// │                                                                                               │
// └───────────────────────────────────────────────────────────────────────────────────────────────┘

export default function Home() {
  return 'OK'
  // const [tierLists, setTierLists] = useState([])
  // const ws = WS(tierLists, setTierLists, true)
  // ws.sendSubscribe()

  // return (
  //   <main className={css.Main}>
  //     {characters.map((character, i) => {
  //       const style = {
  //         width: `${character.points}0px`,
  //       }

  //       return (
  //         <section className={css.Section} key={i}>
  //           <div className={css.Score} {...{ style }}>
  //             {character.points}
  //           </div>
  //           <div className={css.Image}>
  //             <img src={character.image} />
  //           </div>
  //         </section>
  //       )
  //     })}
  //   </main>
  // )
}
