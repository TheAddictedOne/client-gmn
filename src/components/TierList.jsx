import Character from '@/components/Character.jsx'
import css from '@/components/TierList.module.css'
import { move, reorder } from '@/utils/helpers.js'

export default function TierList({ store, setStore }: TierListParams) {
  function Section({ tier, characters }: SectionParams) {
    function onDrop(event: React.DragEvent) {
      event.preventDefault()

      const slug = event.dataTransfer.getData('text/plain')
      event.currentTarget.classList.remove(css.TierHighlighted)
      setStore(move(store, slug, tier))
    }

    function onDragOver(event: React.DragEvent) {
      event.preventDefault()
    }

    function onDragEnter(event: React.DragEvent) {
      event.currentTarget.classList.add(css.TierHighlighted)
    }

    function onDragLeave(event: React.DragEvent) {
      event.currentTarget.classList.remove(css.TierHighlighted)
    }

    const dragFunctions = { onDrop, onDragOver, onDragEnter, onDragLeave }

    return (
      <section className={css.Tier} {...dragFunctions}>
        <header>Section</header>
        {characters.map((character) => {
          return <Character key={character.slug} {...{ store, setStore, character }} />
        })}
      </section>
    )
  }

  return (
    <div className={css.TierList}>
      {reorder(store).map((section) => (
        <Section key={section.tier} {...section} />
      ))}
    </div>
  )
}
