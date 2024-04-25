import { useEffect, useState } from 'react'
import css from '@/components/Section.module.css'
import Character from '@/components/Character.jsx'

const Section = ({ tier, title }) => {
  const [names, setNames] = useState([])

  useEffect(() => {
    const list = window.localStorage.getItem(tier)
    if (!list) return
    setNames(JSON.parse(list))
  }, [])

  const onDrop = (event) => {
    console.log('DROP')
    event.preventDefault()
    const name = event.dataTransfer.getData('text/plain')
    event.currentTarget.classList.remove(css.TierHighlighted)
    const newNames = [...names, name]
    setNames(newNames)
    window.localStorage.setItem(tier, JSON.stringify(newNames))
  }

  const onDragOver = (event) => {
    event.preventDefault()
  }

  const onDragEnter = (event) => {
    event.currentTarget.classList.add(css.TierHighlighted)
  }

  const onDragLeave = (event) => {
    event.currentTarget.classList.remove(css.TierHighlighted)
  }

  return (
    <section className={css.Tier} {...{ onDrop, onDragOver, onDragEnter, onDragLeave }}>
      <header data-tier={tier}>{title}</header>
      {names.map((name, i) => (
        <Character key={i} {...{ name }} />
      ))}
    </section>
  )
}

export default Section
