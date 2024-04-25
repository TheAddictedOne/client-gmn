import css from '@/components/Characters.module.css'

export default function Characters({ children }) {
  return <section className={css.Characters}>{children}</section>
}
