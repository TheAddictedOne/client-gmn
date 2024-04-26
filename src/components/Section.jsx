import { useEffect, useState } from 'react'
import css from '@/components/Section.module.css'
import Character from '@/components/Character.jsx'
import { updateTier } from '@/utils/helpers.js'

const Section = ({ source, title, list, setList, dragElement, setDragElement }) => {
  const onDragStart = ({ target }) => {
    setDragElement({
      ...dragElement,
      name: target.title,
      source,
    })
  }
  const onDrop = ({ currentTarget }) => {
    currentTarget.classList.remove(css.TierHighlighted)
    setDragElement({
      ...dragElement,
      destination: source,
    })
  }

  const onDragOver = (event) => event.preventDefault()

  const onDragEnter = (event) => {
    event.currentTarget.classList.add(css.TierHighlighted)
  }

  const onDragLeave = (event) => {
    event.currentTarget.classList.remove(css.TierHighlighted)
  }

  return (
    <section
      className={css.Tier}
      {...{ onDragStart, onDrop, onDragOver, onDragEnter, onDragLeave }}
    >
      <header data-tier={source}>{title}</header>
      {list.map((name, i) => {
        console.log(name)
        return <Character key={i} {...{ name }} />
      })}
    </section>
  )
}

export default Section
