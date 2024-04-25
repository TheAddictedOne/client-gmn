import css from '@/components/Header.module.css'

export default function Header({ uuid }) {
  return (
    <header className={css.Header}>
      <h1>{uuid}</h1>
    </header>
  )
}
