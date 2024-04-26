import css from '@/components/Header.module.css'
import { useState, useEffect } from 'react'
import { getUUID, getItem, getUsername } from '@/utils/helpers.js'

const Header = () => {
  const [username, setUsername] = useState(getUsername())

  useEffect(() => {
    window.localStorage.setItem('username', username)
  }, [username])

  const onChange = (event) => {
    setUsername(event.currentTarget.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const body = JSON.stringify({
      uuid: getUUID(),
      name: getUsername(),
      A: getItem('A'),
      B: getItem('B'),
      C: getItem('C'),
      D: getItem('D'),
    })
    fetch('/api', {
      method: 'POST',
      body,
    })
  }

  return (
    <header className={css.Header}>
      <input type="text" placeholder="Nom du joueur" {...{ onChange }} value={username} />
      <button onClick={onSubmit}>Send !</button>
    </header>
  )
}

export default Header
