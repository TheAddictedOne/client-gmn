import css from '@/components/Header.module.css'
import { useState, useEffect } from 'react'

export default function Header() {
  const [name, setName] = useState('')

  useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  const onChange = (event) => {
    setName(event.currentTarget.value)
  }

  return (
    <header className={css.Header}>
      <input type="text" placeholder="Nom du joueur" {...{ onChange }} />
    </header>
  )
}
