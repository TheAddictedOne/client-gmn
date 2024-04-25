import names from '@/utils/names.json'
import { useEffect, useState } from 'react'
import css from '@/components/Backlog.module.css'
import Character from '@/components/Character.jsx'

const Backlog = () => {
  const [backlog, setBacklog] = useState(names)

  useEffect(() => {
    const item = window.localStorage.getItem('backlog')
    if (!item) return
    setBacklog(JSON.parse(item))
  }, [])

  const onDragStart = (event) => {
    event.dataTransfer.setData('text/plain', event.target.title)
  }
  const onDragOver = () => event.preventDefault()
  const onDragEnter = () => event.preventDefault()
  const onDragLeave = () => event.preventDefault()
  const onDrop = (event) => {
    const title = event.target.title
    const index = backlog.findIndex((name) => name === title)
    const droppedName = event.dataTransfer.getData('text/plain')
    const newBacklog = [...backlog].filter((name) => name !== droppedName)
    newBacklog.splice(index, 0, droppedName)
    setBacklog(newBacklog)
  }

  return (
    <section
      className={css.Backlog}
      {...{ onDragStart, onDragOver, onDragEnter, onDragLeave, onDrop }}
    >
      {backlog.map((name, i) => (
        <Character key={i} {...{ name }} />
      ))}
    </section>
  )
}

export default Backlog
