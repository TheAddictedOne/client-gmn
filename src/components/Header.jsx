import css from '@/components/Header.module.css'
import { useState, useEffect } from 'react'

const Header = () => {
  const [name, setName] = useState('')

  useEffect(() => {
    const item = window.localStorage.getItem('name')
    if (!item) return
    setName(item)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  const onChange = (event) => {
    setName(event.currentTarget.value)
  }

  return (
    <header className={css.Header}>
      <input type="text" placeholder="Nom du joueur" {...{ onChange }} value={name} />
    </header>
  )
}

export default Header
