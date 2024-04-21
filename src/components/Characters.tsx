import css from '@/components/Characters.module.css'

export default function Characters({ children }: Readonly<{ children: React.ReactNode }>) {
  return <section className={css.Characters}>{children}</section>
}
