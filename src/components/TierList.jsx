import Character from '@/components/Character.jsx'
import css from '@/components/TierList.module.css'
import { move, reorder } from '@/utils/helpers.js'

export default function TierList({ characters, setCharacters }) {
  function Section({ tier, characters }) {
    function onDrop(event) {
      event.preventDefault()

      const slug = event.dataTransfer.getData('text/plain')
      event.currentTarget.classList.remove(css.TierHighlighted)
      setCharacters(move(characters, slug, tier))
    }

    function onDragOver(event) {
      event.preventDefault()
    }

    function onDragEnter(event) {
      event.currentTarget.classList.add(css.TierHighlighted)
    }

    function onDragLeave(event) {
      event.currentTarget.classList.remove(css.TierHighlighted)
    }

    const dragFunctions = { onDrop, onDragOver, onDragEnter, onDragLeave }

    return (
      <section className={css.Tier} {...dragFunctions}>
        <header>Section</header>
        {characters.map((character) => {
          return <Character key={character.slug} {...{ characters, setCharacters, character }} />
        })}
      </section>
    )
  }

  return (
    <div className={css.TierList}>
      {reorder(characters).map((section) => (
        <Section key={section.tier} {...section} />
      ))}
    </div>
  )
}
