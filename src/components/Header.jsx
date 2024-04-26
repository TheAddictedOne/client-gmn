import css from '@/components/Header.module.css'
import { useState, useEffect } from 'react'
import { getUsername } from '@/utils/helpers.js'

const Header = () => {
  const [username, setUsername] = useState(getUsername())

  useEffect(() => {
    window.localStorage.setItem('username', username)
  }, [username])

  const onChange = (event) => {
    setUsername(event.currentTarget.value)
  }

  return (
    <header className={css.Header}>
      <input type="text" placeholder="Nom du joueur" {...{ onChange }} value={username} />
    </header>
  )
}

export default Header
