import names from '@/utils/names.json'
import { useEffect, useState } from 'react'
import css from '@/components/Backlog.module.css'
import Character from '@/components/Character.jsx'

const Backlog = () => {
  const [backlog, setBacklog] = useState(names)
  const [dragName, setDragName] = useState('')

  useEffect(() => {
    const item = window.localStorage.getItem('backlog')
    if (!item) return
    setBacklog(JSON.parse(item))
  }, [])

  const onDragStart = (event) => {
    const name = event.target.title
    setDragName(name)
    event.dataTransfer.setData('text/plain', name)
  }
  const onDragOver = () => event.preventDefault()
  const onDragEnter = () => event.preventDefault()
  const onDragLeave = () => {
    const newBacklog = backlog.filter((name) => name !== dragName)
    setBacklog(newBacklog)
  }
  const onDrop = (event) => {
    const title = event.target.title
    const index = backlog.findIndex((name) => name === title)
    const newBacklog = backlog.filter((name) => name !== dragName)
    newBacklog.splice(index, 0, dragName)
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
