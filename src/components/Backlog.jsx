import names from '@/utils/names.json'
import { useEffect, useState } from 'react'
import css from '@/components/Backlog.module.css'
import Character from '@/components/Character.jsx'
import { updateBacklog } from '@/utils/helpers.js'

const Backlog = ({ source, list, setList, dragElement, setDragElement }) => {
  const onDragStart = ({ target }) => {
    setDragElement({
      ...dragElement,
      name: target.title,
      source,
    })
  }
  const onDragOver = (event) => event.preventDefault()
  const onDragEnter = (event) => event.preventDefault()
  const onDragLeave = (event) => event.preventDefault()
  const onDrop = ({ target }) => {
    // const index = list.findIndex((name) => name === target.title)
    setDragElement({
      ...dragElement,
      destination: source,
    })
  }

  return (
    <section
      className={css.Backlog}
      {...{ onDragStart, onDragOver, onDragEnter, onDragLeave, onDrop }}
    >
      {list.map((name, i) => (
        <Character key={i} {...{ name }} />
      ))}
    </section>
  )
}

export default Backlog
